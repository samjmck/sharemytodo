import { writable } from "svelte/store";
import type { List, PersonalOrSharedList } from "./types";

export const shouldUpdate = writable(false);

export const openShareDialog = writable(false);
export const openListsMenu = writable(false);

export const selectedList = writable<PersonalOrSharedList>({
    uuid: "",
    list: {
        title: "",
        items: [
            { content: "", checked: false },
        ],
    },
});

function createListsStore() {
    const { subscribe, set, update } = writable<{ [uuid: string]: List }>({});
    return {
        subscribe,
        set,
        update,
        setList: (uuid: string, newList: List) => {
            update(lists => {
                lists[uuid] = newList;
                return lists;
            });
        },
        deleteList: (uuid: string) => {
            update(lists => {
                delete lists[uuid];
                return lists;
            });
        },
    };
}

export const lists = createListsStore();
