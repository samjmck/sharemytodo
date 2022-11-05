# sharemytodo

A to-do list server and website which also allows you to share your lists with others. The app is stateless in the sense that the server doesn't store any information about users or about who the lists are shared with. It relies on JSON Web Tokens (JWT) and Message Authentication Codes (MAC) to do so. The lists themselves are the only things stored.

- Server is written in TypeScript and hosted by Cloudflare Workers
- Storage for the lists is on Cloudflare Workers KV
- Site is written in Svelte (with TypeScript) and hosted by Cloudflare Pages

The server code can easily be adapted to work with other JavaScript runtimes or serverless platforms that implement web APIs such as Deno. As for the storage, Workers KV is a fairly simple key-value database. It shouldn't be too difficult to switch it out with another key-value database such as Redis. The website is statically generated so can be hosted on any platform or host that supports static files.

See a description of the backend's endpoints [here](/cloudflare-worker/README.md) and a motivation for the site's technical design [here](/site/README.md). I also wrote a [blog post](https://samjmck.com/en/blog/stateless-serverless-to-do-app/#whats-so-interesting-about-serverless-computing) about the stateless design of the app.

## Getting started

Clone the repository with `git clone git@github.com:samjmck/sharemytodo.git` and change to the directory of repository.

### Deploying the Cloudflare Worker

1. Change directory to the Cloudflare Worker directory with `cd cloudflare-worker`
2. Run `npm install`
3. Run `npm install -g wrangler` if you haven't already installed Wrangler (Cloudflare Workers CLI)
4. Create a KV store for the lists with `wrangler kv:namespace create sharemytodo`
5. Add the output of the previous command to `wrangler.toml` as such:
```toml
kv_namespaces = [
    { binding = "SHAREMYTODO_KV", id = "wrangler_cli_output" }
]
```
Remember to replace the ID with the ID in the output of the previous command.

6. Deploy the code to Cloudflare with `wrangler deploy --name sharemytodo`
7. Generate random two random strings with `openssl rand -hex 32`. Visit the dashboard of your newly created Cloudflare Worker and go the environment variable settings. Set the first random string as `JWT_SECRET` and the second random string as `MAC_KEY`.

### Deploying the site

Note that you can deploy the site to any web server that hosts static files. I use Cloudflare Pages as I'm already using Cloudflare for the Worker but Netlify or any other platform would also be fine.

1. Change directory to the site with `cd site`
2. Run `npm install`
3. Change the API URL in `src/sync/server.ts` to the URL of the Cloudflare Worker
3. Run `npm run build`
4. The files of the web app are in the `dist` folder

Configure the above commands on the platform that you are using.

## Problems

Given a server and a key-value database, these are the problems we are trying to solve:
1. A user can have multiple to-do lists, each list contains multiple to-do items
2. A list has the option to be openly shared
3. Shared lists can be publicly readable or writable
4. A list needs to be nearly instantly available

## Solutions

1. The concept of a user doesn't even have to exist from the server's perspective. We can let the users save a list of identifiers for their lists on the client-side.
2. We don't want to rely on incremental IDs. Instead, we will assign a Universally Unique Identifier (UUID) to each list. There are different versions of UUIDs. We will be using v1 which is generated based on the current time and identifier of a machine.
3. Each user will be given a JSON Web Token (JWT) containing a list of their lists' UUIDs. The JWT can be seen as a user's data signed or verified by the server meaning a user cannot spoof or change their data without permission from the server. For example, if a user tries to add another user's list UUID to their JWT's data, the JWT will not be verified as it won't have been signed by the server.
4. When a user wants to share a list, these 2 parameters will be shared with a recipient: list UUID, writable. To prevent a client from generating a random UUID and accessing a random list or changing the permissions, a Message Authentication Code (MAC) will be generated and sent alongside the parameters. This way, the server can verify whether an attempt at accessing a shared list is actually authorised.

## Key-value database design

```
lists:list#{uuid} -> List
```

### Key

`lists:list#{uuid}`

With `{uuid}` being the UUID of the list.

### Value

List schema:

```ts
type List = {
	title: string;
	items: {
		checked: boolean;
		content: string;
	}[];
}
```

## Why?

I have been playing around with different serverless platforms for a while now. I was trying to think of a project to further experiment with these technologies. To-do lists apps are what "hello world" programs are to web frameworks, so I wanted to find something more challenging but still simple.

Making the lists shareable in a to-do app seemed sufficiently challenging and, if designed correctly, seemed like it would fit serverless computing perfectly. Serverless platforms generally bill you based on the amount of time your functions take to request. Because they are short-lived functions, tasks like opening a socket connection with a third-party database can be quite costly as they would have to happen on every function execution. Generally speaking, you want your functions to be small and to execute quickly.

This is when JSON Web Tokens (JWT) come in handy. JWTs consist of two things: some data and a signature of that data. Only the server is able to sign the data. If a client changes their JWT's data, the server will notice that the signature doesn't match the data. A server asking a client to store a JWT is effectively outsourcing the work of storing data to the client. This is ideal for serverless functions that ideally want to do as little work as possible and might not have access to persistent storage.

In sharemytodo's case, a client's JWT's data consists of a list of identifiers for the to-do's they own. If a client wants to create a new list, they send a request to the server and the server will respond with an updated list of identifiers for their lists as well as an updated signature. If the client tries to modify their list of identifiers to add the identifier of a list they don't own, the signature won't match and future requests will be denied by the server.

For sharing lists, Message Authentication Codes (MAC) are used. The creator of a list chooses whether they want to make their list writable by other people or only readable. This paramater, along with the identifier of the list, will be signed by server. The list's creator can now share a link containing the data and the signature. If someone opening the link tries to change the parameter to make the list writable when it should be readable, the signature won't match and the list won't load. In this case, MACs serve a nearly identical purpose to JWTs.
