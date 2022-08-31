import { verifyRequestJWT } from "../jwt";
import { ShareListParams } from "../types";

export async function handleShareList(request: Request): Promise<Response> {
    if(request.method === "POST") {
        try {
            const jwtData = await verifyRequestJWT(request);
            const body = await request.json<ShareListParams>();

            // Check if list belongs to user
            if(!jwtData.lists.includes(body.uuid)) {
                return new Response(null, { status: 401 });
            }

            // Generate MAC
            const textEncoder = new TextEncoder();
            const macKeyData = textEncoder.encode(MAC_KEY);
            const key = await crypto.subtle.importKey(
                'raw',
                macKeyData,
                { name: 'HMAC', hash: 'SHA-256' },
                false,
                ['sign']
            );

            const mac = await crypto.subtle.sign('HMAC', key, textEncoder.encode(JSON.stringify({
                uuid: body.uuid,
                writable: body.writable,
            })));
            const base64Mac = btoa(String.fromCharCode(...new Uint8Array(mac)));
            return new Response(base64Mac);
        } catch(error) {
            return new Response(null, { status: 401 });
        }
    }
    return new Response(null, { status: 500 });
}
