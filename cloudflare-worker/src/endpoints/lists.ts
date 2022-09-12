import { signJWT, verifyRequestJWT } from "../jwt";
import { isShared, List, PrivateParams, SharedParams } from "../types";

// From Cloudflare Workers
// See https://developers.cloudflare.com/workers/examples/signing-requests/
function byteStringToUint8Array(byteString: string) {
    const ui = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; ++i) {
        ui[i] = byteString.charCodeAt(i);
    }
    return ui;
}

async function verifyMAC(data: any, receivedUrlMacBase64: string): Promise<boolean> {
    const textEncoder = new TextEncoder();
    const macKeyData = textEncoder.encode(MAC_KEY);
    const key = await crypto.subtle.importKey(
        "raw",
        macKeyData,
        {name: "HMAC", hash: "SHA-256"},
        false,
        ["verify"]
    );

    const mac = byteStringToUint8Array(atob(decodeURIComponent(receivedUrlMacBase64)));
    return crypto.subtle.verify(
        "HMAC",
        key,
        mac,
        textEncoder.encode(JSON.stringify(data)),
    );
}

async function createList(request: Request): Promise<Response> {
    // Create user then list
    if(request.headers.get("Authorization") === null) {
        const userUuid = await crypto.randomUUID();
        const listUuid = await crypto.randomUUID();
        const data = await request.json<List>();
        await SHAREMYTODO_KV.put(`lists:list#${listUuid}`, JSON.stringify(data));

        return new Response(JSON.stringify({
            uuid: listUuid,
            jwt: await signJWT({
                user: userUuid,
                lists: [listUuid],
            }),
        }), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 201,
        });
    // User already exists, create list and add to array of list uuids
    } else {
        try {
            const jwtData = await verifyRequestJWT(request);

            const listUuid = await crypto.randomUUID();
            const data = await request.json<List>();
            await SHAREMYTODO_KV.put(`lists:list#${listUuid}`, JSON.stringify(data));

            jwtData.lists.push(listUuid);
            return new Response(JSON.stringify({
                uuid: listUuid,
                jwt: await signJWT(jwtData),
            }), {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 201,
            });
        } catch (error) {
            return new Response(null, { status: 401 });
        }
    }
}

async function modifyList(request: Request): Promise<Response> {
    const body = await request.json<(SharedParams | PrivateParams) & { list: List }>();
    // Modify someone else's list
    if(isShared(body)) {
        if(!body.writable) {
            return new Response(null, { status: 401 });
        }

        const verified = await verifyMAC({
            uuid: body.uuid,
            writable: body.writable,
        }, body.mac);
        if(verified) {
            await SHAREMYTODO_KV.put(`lists:list#${body.uuid}`, JSON.stringify(body.list));
            return new Response(null, { status: 200 });
        }
        return new Response(null, { status: 401 });
    // Modify own list
    } else {
        try {
            const decodedJwt = await verifyRequestJWT(request);
            if(decodedJwt.lists.indexOf(body.uuid) === -1) {
                return new Response(null, { status: 401 });
            }
            await SHAREMYTODO_KV.put(`lists:list#${body.uuid}`, JSON.stringify(body.list));
            return new Response(null, { status: 200 });
        } catch (error) {
            return new Response(null, { status: 401 });
        }
    }
}

async function viewList(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);

    // View someone else's list
    const uuid = searchParams.get("uuid");
    const writable = searchParams.get("writable");
    const mac = searchParams.get("mac");
    if(uuid !== null && writable !== null && mac !== null) {
        const verified = await verifyMAC({
            uuid: uuid,
            writable: writable === "true",
        }, mac);
        if(verified) {
            return new Response(await SHAREMYTODO_KV.get(`lists:list#${uuid}`));
        }
        return new Response(null, { status: 401 });
    // View own list
    } else if (uuid !== null) {
        try {
            const jwtData = await verifyRequestJWT(request);
            // Check if list belongs to user
            if(!jwtData.lists.includes(uuid)) {
                return new Response(null, { status: 401 });
            }
            return new Response(await SHAREMYTODO_KV.get(`lists:list#${uuid}`));
        } catch(error) {
            return new Response(null, { status: 401 });
        }
    }
    return new Response(null, { status: 500 });
}

async function deleteList(request: Request): Promise<Response> {
    const body = await request.json<PrivateParams>();
    try {
        const jwtData = await verifyRequestJWT(request);

        const index = jwtData.lists.indexOf(body.uuid);
        if(index === -1) {
            return new Response(null, { status: 401 });
        }

        await SHAREMYTODO_KV.delete(`lists:list#${body.uuid}`);

        jwtData.lists.splice(index, 1);
        return new Response(JSON.stringify({
            jwt: await signJWT(jwtData),
        }));
    } catch (error) {
        return new Response(null, { status: 401 });
    }
}

export async function handleLists(request: Request) {
    // Create new list
    if (request.method === "POST") {
        return createList(request);
    // Modify existing list
    } else if (request.method === "PUT") {
        return modifyList(request);
    // View list
    } else if(request.method === "GET") {
        return viewList(request);
    // Delete list
    } else if(request.method === "DELETE") {
        return deleteList(request);
    }
    return new Response(null, {status: 500});
}
