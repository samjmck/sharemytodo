import type { List, SharedParams } from "./types";
import { selectedList, shouldUpdate, lists } from "./stores";
import {
    getLocalStorageCurrentListUuid,
    getLocalStorageJwt,
    getLocalStorageLists,
    isLocalStorageUsed, setLocalStorageCurrentListUuid, setLocalStorageJwt, setLocalStorageLists
} from "./sync/local-storage";
import {
    getCachedLists,
    setCachedCurrentListUuid,
    setCachedJwt,
    setCachedLists, updateCachedList
} from "./sync/cache";
import { createList, getPrivateList, getSharedList } from "./sync/server.js";

export async function init() {
    const paths = window.location.href.split("/");
    // We are looking at a shared list
    if(paths[paths.length - 2] == "lists") {
        const searchParams = new URLSearchParams(paths[paths.length - 1]);
        const sharedParams: SharedParams = {
            uuid: searchParams.get("u"),
            writable: searchParams.get("w") === "1",
            mac: decodeURIComponent(searchParams.get("m")),
        };

        const sharedListData = await getSharedList(sharedParams)
        selectedList.set({ list: sharedListData, ...sharedParams });

        if(isLocalStorageUsed()) {
            const localStorageJwt = getLocalStorageJwt();
            const localStorageLists = getLocalStorageLists();

            setCachedJwt(localStorageJwt);
            setCachedLists(localStorageLists);

            lists.set(localStorageLists);
        }
    // We are looking at our own lists
    } else {
        // User already exists
        if(isLocalStorageUsed()) {
            // Set last used list
            const localStorageJwt = getLocalStorageJwt();
            const localStorageLists = getLocalStorageLists();
            const localStorageCurrentListUuid = getLocalStorageCurrentListUuid();

            setCachedJwt(localStorageJwt);
            setCachedLists(localStorageLists);
            setCachedCurrentListUuid(localStorageCurrentListUuid);

            lists.set(localStorageLists);
            selectedList.set({ list: localStorageLists[localStorageCurrentListUuid], uuid: localStorageCurrentListUuid });

            // Check if last used list has been updated in meantime
            const currentListNewestData = await getPrivateList(localStorageJwt, { uuid: localStorageCurrentListUuid });
            if(JSON.stringify(currentListNewestData) !== JSON.stringify(localStorageLists[localStorageCurrentListUuid])) {
                // List data has changed in meantime, update
                lists.setList(localStorageCurrentListUuid, currentListNewestData);
                selectedList.set({ list: currentListNewestData, uuid: localStorageCurrentListUuid });
                updateCachedList(localStorageCurrentListUuid, currentListNewestData);
                setLocalStorageLists(getCachedLists());
            }
        // New user, create first list
        } else {
            const newList: List = {
                title: "",
                items: [{ content: "", checked: false }],
            };
            const { uuid: newUuid, jwt: newJwt } = await createList(newList);
            const newLists = { [newUuid]: newList };

            setCachedJwt(newJwt);
            setCachedCurrentListUuid(newUuid);
            setCachedLists(newLists);

            setLocalStorageJwt(newJwt);
            setLocalStorageCurrentListUuid(newUuid);
            setLocalStorageLists(newLists);

            lists.set(newLists);
            selectedList.set({ uuid: newUuid, list: newList });
        }
        shouldUpdate.set(true);
    }
}
