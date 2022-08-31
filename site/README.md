# sharemytodo site

To make sure the site is as fast as possible, it utilises the `localStorage` API. On each load, the user's lists will first be loaded from local storage and then fetched from the server. The local storage will then be updated if the server's response doesn't match it.

As local storage is a blocking operation on the main thread, it could potentially slow down the interface if being utilised often in a short period of time. For example, while a user is editing their list, we might want to update the local storage each time a list has been changed. This would mean writing to local storage on each keystroke. To mitigate this issue, large writes to local storage are delayed until the point at which the user is probably finished typing. That way, the extra load on the main thread shouldn't as visible in the user interface. There is also a cache for the local storage which is simply variables in memory. 

Is this over-engineered? Yes, heavily even. The difference between reading and writing data from memory versus whatever local storage uses is probably negligible for such small amounts of data. Suppose your list had millions of items, then it might make a difference. But no one will be using this site for that. The whole point of the project was to experiment with different technologies and think about worst-case scenarios and what to do in those situations.

Syncing data between the "cache", the local storage API and the server was something I struggled to find a good system for. At first, I tried doing too much in one place: the state management of the web app would sync with the server, the cache and local storage. This was a mistake. I found it's a lot easier to keep state management separate from those things. Even combining the cache with the local storage API was too much. 

Abstracting these concepts at a low-level and keeping them independent of each other was the solution I went for. It massively reduced complexity in most parts of the app even though it meant more duplicate code such as the following:

```ts
setCachedJwt(jwt);
setCachedCurrentListUuid(uuid);
setCachedLists(lists);
setLocalStorageJwt(jwt);
setLocalStorageCurrentListUuid(uuid);
setLocalStorageLists(lists);
```

Lastly, something I would've loved to have is server-side rendering. Currently, when visiting the app, you have to wait for the generated JavaScript bundles to execute before you can see the user interface. This isn't really a problem: the HTML page is practically empty and the generated JavaScript code from the Svelte compiler is actually quite lean and efficient, so everything happens quickly. However, I'm not a fan of this model. The user interface would be visible faster if the necessary HTML was just in the HTML page instead of being inserted by JavaScript. This is referred to as "hydration" in most JavaScript frameworks with the HTML being "pre-rendered". 

Most frameworks like Next.js provide this functionality. SvelteKit, the official framework for Svelte, also has this functionality. The problem is that SvelteKit is still in development and relatively unstable at the time of writing. It also adds a fair amount of complexity that I don't feel comfortable with. This is why I settled with using just Svelte. 
