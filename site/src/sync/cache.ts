import type { List } from "../types.js";

let cachedCurrentListUuid: string;
let cachedJwt: string;
let cachedLists: { [uuid: string]: List };

export function getCachedCurrentListUuid() {
    return cachedCurrentListUuid;
}

export function setCachedCurrentListUuid(currentListUuid: string) {
    cachedCurrentListUuid = currentListUuid;
}

export function getCachedJwt() {
    return cachedJwt;
}

export function setCachedJwt(jwt: string) {
    cachedJwt = jwt;
}

export function getCachedLists() {
    return cachedLists;
}

export function setCachedLists(lists: { [uuid: string]: List }) {
    cachedLists = lists;
}

export function updateCachedList(uuid: string, list: List) {
    cachedLists[uuid] = list;
}
