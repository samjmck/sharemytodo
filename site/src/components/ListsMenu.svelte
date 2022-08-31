<script lang="ts">
    import type { List } from "../types.js";
    import { lists, selectedList, openListsMenu } from "../stores.js";
    import {
        getCachedCurrentListUuid,
        getCachedJwt,
        getCachedLists,
        setCachedCurrentListUuid,
        setCachedJwt,
        setCachedLists,
    } from "../sync/cache.js";
    import {
        setLocalStorageCurrentListUuid,
        setLocalStorageJwt,
        setLocalStorageLists
    } from "../sync/local-storage.js";
    import { createList, deleteList } from "../sync/server.js";

    let listsArray: [string, List][];
    $: {
        listsArray = <[string, List][]> Object.entries($lists);
    }

    function changeCurrentList(newCurrentListUuid: string, newCurrentList: List) {
        $selectedList = { uuid: newCurrentListUuid, list: newCurrentList };
        setCachedCurrentListUuid(newCurrentListUuid);
        setLocalStorageCurrentListUuid(newCurrentListUuid);
        $openListsMenu = !$openListsMenu;
    }

    async function createEmptyList() {
        const emptyList: List = {
            title: "",
            items: [{ content: "", checked: false }],
        };

        const { uuid, jwt } = await createList(emptyList, getCachedJwt());

        lists.setList(uuid, emptyList);

        const cachedLists = getCachedLists();
        cachedLists[uuid] = emptyList;
        setCachedLists(cachedLists);
        setLocalStorageLists(cachedLists);
        setCachedJwt(jwt);
        setLocalStorageJwt(jwt);

        $selectedList = {
            uuid,
            list: emptyList,
        };
        setCachedCurrentListUuid(uuid);
        setLocalStorageCurrentListUuid(uuid);

        $openListsMenu = !$openListsMenu;
    }

    async function promptDelete(uuid: string, listTitle: string) {
        if(confirm(`Confirm you would like to delete "${listTitle}"`)) {
            const jwt = await deleteList(getCachedJwt(), { uuid });

            lists.deleteList(uuid);

            const cachedLists = getCachedLists();
            delete cachedLists[uuid];
            setCachedLists(cachedLists);
            setLocalStorageLists(cachedLists);
            setCachedJwt(jwt);
            setLocalStorageJwt(jwt);

            const listUuids = Object.keys(cachedLists);
            const listsCount = listUuids.length;
            if(listsCount === 0) {
                await createEmptyList();
            } else {
                const currentListUuid = getCachedCurrentListUuid();
                if(currentListUuid === uuid) {
                    $selectedList = {
                        uuid: listUuids[0],
                        list: cachedLists[listUuids[0]],
                    };
                    setCachedCurrentListUuid(listUuids[0]);
                    setLocalStorageCurrentListUuid(listUuids[0]);
                }
            }
        }
    }

    function handleLiClick(event: PointerEvent, uuid: string, list: List) {
        // In this case, we are clicking on only the "X" element (to delete a list)
        if((<Element> event.target).classList.contains("delete-item")) {
            promptDelete(uuid, list.title);
        } else {
            changeCurrentList(uuid, list);
        }
    }
</script>

<div class="background-overlay" class:open={$openListsMenu}></div>
<div class="lists" class:open={$openListsMenu}>
    <svg on:click={() => $openListsMenu = !$openListsMenu} class="toggle-side-menu" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    <ul>
        <li class="add-list" on:click={createEmptyList}><svg class="add-list-symbol" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Create new list</li>
        {#each listsArray as [uuid, list], i (uuid)}
            <li on:click={e => handleLiClick(e, uuid, list)} class="select-list" class:selected={list === $selectedList.list && (list.title !== "" || i !== 0)}>
                <span class="title select-list">{list.title}</span>
                <svg class="delete-item" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </li>
        {/each}
    </ul>
</div>

<style>
    div.background-overlay {
        background-color: rgba(255, 255, 255, 0.95);
        opacity: 0;
        z-index: -1;
        position: fixed;
        width: 100vw;
        height: 100vh;
        will-change: opacity;
        transition: 0.2s ease-in-out opacity;
    }
    div.lists {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 15em;
        height: 100vh;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        z-index: 3;
        transition: 0.2s ease-in-out transform;
        will-change: transform;
    }
    div.lists.open {
        transform: translateX(0);
        transition: 0.2s ease-in-out transform;
    }
    ul {
        flex: 1;
        padding: 0;
        box-sizing: border-box;
        margin: 0;
        list-style-type: none;
        background-color: #fff;
        height: 100%;
    }
    li {
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        padding: 0.6em;
        margin: 0.6em 0;
        color: #626262;
    }
    li.add-list {
        position: sticky;
        cursor: pointer;
    }
    li span.title {
        flex: 1;
    }
    li.selected {
        color: #000;
        background-color: #e1e1e1;
        border-radius: 0 6px 6px 0;
        box-shadow: 0 0 1em 4px rgba(0, 0, 0, 0.1);
    }
    li:hover svg.delete-item {
        visibility: visible;
    }
    svg.add-list-symbol {
        margin-right: 0.1em;
    }
    svg.delete-item {
        visibility: hidden;
        padding: 0 0.6em;
    }
    svg.toggle-side-menu {
        display: none;
        cursor: pointer;
        margin: 1em 0;
    }
    @media screen and (max-width: 1175px) {
        div.background-overlay.open {
            z-index: 2;
            opacity: 1;
            transition: 0.2s ease-in-out opacity;
        }
        ul {
            box-shadow: 0 0 1em 4px rgba(0, 0, 0, 0.1);
        }
        div.lists {
            max-width: 25em;
            width: 90vw;
            left: initial;
            transform: translateX(100%);
        }
        li.selected {
            border-radius: 0;
        }
        svg.delete-item {
            visibility: visible;
        }
        svg.toggle-side-menu {
            display: block;
        }
    }
</style>
