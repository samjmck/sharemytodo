import { verify, decode, sign } from "@tsndr/cloudflare-worker-jwt";

export async function signJWT(data: any): Promise<string> {
    return sign(data, JWT_SECRET);
}

export async function verifyRequestJWT(request: Request): Promise<any> {
    const authorizationHeader = request.headers.get("authorization");
    if(authorizationHeader === null) {
        throw new Error("authorization header is null");
    }
    const jwt = authorizationHeader.replace("Bearer ", "");
    const isValid = await verify(jwt, JWT_SECRET);
    if(!isValid) {
        throw new Error("jwt is not valid");
    }
    return decode(jwt).payload;
}
