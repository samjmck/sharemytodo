import type { List } from "../types.js";

export function isLocalStorageUsed() {
    return window.localStorage.getItem("jwt") !== null;
}

export function getLocalStorageCurrentListUuid() {
    return window.localStorage.getItem("currentListUuid");
}

export function setLocalStorageCurrentListUuid(currentListUuid: string) {
    window.localStorage.setItem("currentListUuid", currentListUuid);
}

export function getLocalStorageJwt() {
    return window.localStorage.getItem("jwt");
}

export function setLocalStorageJwt(jwt: string) {
    window.localStorage.setItem("jwt", jwt);
}

export function getLocalStorageLists(): { [uuid: string]: List } {
    return JSON.parse(window.localStorage.getItem("lists"));
}

export function setLocalStorageLists(lists: { [uuid: string]: List }) {
    window.localStorage.setItem("lists", JSON.stringify(lists));
}
