import { sign as signJWT } from "@tsndr/cloudflare-worker-jwt";

export async function handleUsers(request: Request) {
    // Create JWT
    if (request.method === "POST") {
        const uuid = await crypto.randomUUID();
        return new Response(await signJWT({ uuid: uuid, lists: [] }, JWT_SECRET));
    }
    return new Response(null, { status: 500 });
}
