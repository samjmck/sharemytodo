# sharemytodo Cloudflare Worker

To see how to host and build this, see the root [`README.md`](/README.md).

## Endpoints

### `/lists`

- `POST /lists`

Responds with status code `201` and the following JSON with `uuid` being the new list's UUID and `jwt` being the new JWT containing the new list's UUID:

```ts
{
	uuid: string;
	jwt: string;
}
```

If the `Authorization` header is set containing a valid JWT in the `Bearer {jwt}` format, the new list's uuid will to the given JWT's data.

- `PUT /lists`

The body should be in JSON and have this schema:

```ts
{
	uuid?: string;
    writable?: true;
    mac?: string;
    list: {
    	title: string;
    	items: {
    		content: string;
    		checked: boolean;
    	}[];
    };
}
```

The `uuid`, `writable` and `mac` parameters are required if you are writing a shared list.

The response will have status code `200` if the request was successful.

- `GET /lists`

To view a personal list, the query parameter `uuid` is required with the `Authorization` header. For a shared list, `uuid`, `writable` and `mac` query parameters are required with `writable` being a `1` or `0`. The JSON response will have the following schema:

```ts
{
	title: string;
	items: {
		content: string;
		checked: boolean;
	}[];
}
```

### `/share-list`

- `POST /share-list`

The body should be in JSON with the following schema:

```ts
{
	uuid: string;
	writable: boolean;
}
```

The JWT in the `Authorization` header should contain the UUID of the list, otherwise the request will be unauthorized. A successful response contains the MAC.

### `/users`

- `POST /users`

Responds with a JWT containing no lists.
