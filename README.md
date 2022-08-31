# sharemytodo

## Problems

Given Cloudflare Workers and Workers KV (Key-Value), these are the problems we are trying to solve:
1. A user can have multiple lists, each list contains multiple items (to-do items)
2. Each list has the option to be openly shared
3. Shared lists are either publicly readable and/or publicly writable
4. For a client opening a list, the list needs to be (nearly) instantly loaded/available

More low-level problems:
5. Due to a lack of strong consistency in KV, values are prone to being overwritten. This means we cannot work with e.g. incrementing user ID's to identify users.
6. No relational database, yet our dataset does contain relations (user -> lists, list -> items)
7. Trade-off between duplicating data (fewer reads but more writes for client, more redundancy and more consistency issues) or "linking" data with identifiers from relations (more reads but fewer writes for client, less redundancy and less consistency issues)

## Solutions

1. The concept of a user doesn't even have to exist from the server's perspective. We can let the users save a list of identifiers for their lists on the client-side.
2. To solve the issue of no incremental IDs in Cloudflare KV, we can assign a Universally Unique Identifier (UUID) to each list. There are different versions of UUID's. We will be using v1, which is generated based on the current time and identifier of a machine.
3. Each user will be given a JSON Web Token (JWT) containing a list of their lists' UUIDs. The JWT can be seen as a user's data signed or verified by the server meaning a user cannot spoof or change their data without permission from the server. For example, if a user tries to add another user's list UUID to their JWT's data, the JWT will not be verified as it won't have been signed by the server.
4. When a user wants to share a list, these 4 parameters will be shared with a recipient: owner UUID, list UUID, readable, writable. To prevent a client from generating a random UUID and accessing a random list, a Message Authentication Code (MAC) will be generated and sent alongside the parameters. This way, the server can verify whether an attempt at accessing a shared list is actually authorised.

## KV design

lists:list#uuid -> { title: "", items: [{ id: 0, content: "", checked: false }] }
