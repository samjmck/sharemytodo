import type { List, PersonalList, PersonalOrSharedList, PersonalParams, SharedParams } from "../types.js";

export const API_URL = `http://localhost:3000/api`;

export async function getSharedList(sharedParams: SharedParams): Promise<List> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("uuid", sharedParams.uuid);
    urlSearchParams.set("writable", sharedParams.writable ? "true" : "false");
    urlSearchParams.set("mac", sharedParams.mac);
    const response = await fetch(`${API_URL}/lists?${urlSearchParams.toString()}`);
    return response.json();
}

export async function getPrivateList(jwt: string, privateParams: PersonalParams): Promise<List> {
    const response = await fetch(`${API_URL}/lists?uuid=${privateParams.uuid}`, {
        headers: {
            "Authorization": `Bearer ${jwt}`,
        },
    });
    return response.json();
}

export async function createList(list: List, jwt?: string): Promise<{ uuid: string, jwt: string }> {
    const headers = {
        "Content-Type": "application/json",
    };
    if(jwt !== undefined) {
        headers["Authorization"] = `Bearer ${jwt}`;
    }
    const response = await fetch(`${API_URL}/lists`, {
        method: "POST",
        body: JSON.stringify(list),
        headers,
    });
    return response.json();
}

export async function updateList(jwt: string, list: PersonalOrSharedList): Promise<void> {
    await fetch(`${API_URL}/lists`, {
        method: "PUT",
        body: JSON.stringify(list),
        headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    });
}

export async function deleteList(jwt: string, privateParams: PersonalParams): Promise<string> {
    const response = await fetch(`${API_URL}/lists`, {
        method: "DELETE",
        body: JSON.stringify(privateParams),
        headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json",
        },
    });
    const responseData = await response.json();
    return <string> responseData.jwt;
}

export async function getSharePath(jwt: string, list: PersonalList, writable: boolean): Promise<string> {
    const response = await fetch(`${API_URL}/share-list`, {
        method: "POST",
        body: JSON.stringify({
            uuid: list.uuid,
            writable,
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        },
    });
    const mac = await response.text();
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("w", writable ? "1" : "0");
    urlSearchParams.set("u", list.uuid);
    urlSearchParams.set("m", encodeURIComponent(mac));
    return `/lists/${urlSearchParams.toString()}`;
}
