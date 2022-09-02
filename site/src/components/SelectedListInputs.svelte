<script lang="ts">
    import SelectedListTitle from './SelectedListTitle.svelte';
    import SelectedListItem from './SelectedListItem.svelte';
    import type { LinkedItem, Item } from "../types";
    import { selectedList, lists } from "../stores";
    import { getCachedJwt, getCachedLists, updateCachedList } from "../sync/cache";
    import { updateList } from "../sync/server";
    import { setLocalStorageLists } from "../sync/local-storage";
    import { isShared } from "../types";

    let list;
    let writable;
    $: {
         list = $selectedList.list;
         if(isShared($selectedList)) {
             writable = $selectedList.writable;
         } else {
             // Private lists are always writable
             writable = true;
         }
    }

    let timeoutId = -1;
    // Update cache, local storage and server with new list values
    async function sync() {
        if(!isShared($selectedList)) {
            lists.setList($selectedList.uuid, list);
            updateCachedList($selectedList.uuid, list);
            // Clear timeout so we don't have overlapping updates
            clearTimeout(timeoutId);
            // Delay local storage update so we don't block the main thread while typing
            timeoutId = setTimeout(() => {
                updateList(getCachedJwt(), $selectedList);
                setLocalStorageLists(getCachedLists());
            }, 300);
        } else {
            if($selectedList.writable) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    updateList(getCachedJwt(), $selectedList);
                    setLocalStorageLists(getCachedLists());
                }, 300);
            }
        }
    }

    let linkedItems: Map<Item, LinkedItem>;
    let firstLinkedListElement;
    // Put in reactive block so linkedItems gets updated every time list (items) changes
    $: {
        linkedItems = new Map();
        firstLinkedListElement = list.items[0];
        for(let i = 0; i < list.items.length; i++) {
            const currentItem = list.items[i];
            const previousLinkedItem = linkedItems.get(list.items[i - 1]);
            const currentLinkedItem: LinkedItem = {
                item: currentItem,
                previousLinkedItem: previousLinkedItem,
                nextLinkedItem: undefined,
            };
            linkedItems.set(currentItem, currentLinkedItem);
            if(previousLinkedItem !== undefined) {
                previousLinkedItem.nextLinkedItem = currentLinkedItem;
            }
        }
    }

    // Converts linked list to array of items
    function getListItemsInOrder(): Item[] {
        const items = [firstLinkedListElement];
        let linkedItem = linkedItems.get(firstLinkedListElement);
        while(linkedItem.nextLinkedItem !== undefined) {
            items.push(linkedItem.nextLinkedItem.item);
            linkedItem = linkedItem.nextLinkedItem;
        }
        return items;
    }


    let focusedTitle = false;
    let focusedCaretAtStart = false;
    let focusedToDoItem: Item | null = null;

    function addItemAfter(currentItem: Item) {
        const newToDoItem: Item = {
            content: "",
            checked: false,
        };
        const currentLinkedItem = linkedItems.get(currentItem);
        const newLinkedItem: LinkedItem = {
            item: newToDoItem,
            previousLinkedItem: currentLinkedItem,
            nextLinkedItem: currentLinkedItem.nextLinkedItem,
        };
        currentLinkedItem.nextLinkedItem = newLinkedItem;
        linkedItems.set(newToDoItem, newLinkedItem);
        list.items = getListItemsInOrder();
    }
    function deleteItem(currentItem: Item) {
        const currentLinkedItem = linkedItems.get(currentItem);
        if(currentLinkedItem.previousLinkedItem !== undefined) {
            currentLinkedItem.previousLinkedItem.nextLinkedItem = currentLinkedItem.nextLinkedItem;
        }
        if(currentLinkedItem.nextLinkedItem !== undefined) {
            currentLinkedItem.nextLinkedItem.previousLinkedItem = currentLinkedItem.previousLinkedItem;
        }
        linkedItems.delete(currentItem);
        if(firstLinkedListElement === currentItem) {
            currentLinkedItem.nextLinkedItem.item;
        }
        list.items = getListItemsInOrder();
    }

    function focusPreviousItem(currentItem: Item) {
        const currentLinkedItem = linkedItems.get(currentItem);
        if(currentLinkedItem.previousLinkedItem !== undefined) {
            focusedCaretAtStart = false;
            focusedToDoItem = currentLinkedItem.previousLinkedItem.item;
        } else {
            focusedToDoItem = null;
            focusedTitle = true;
        }
    }
    function focusNextItem(currentItem: Item) {
        const currentLinkedItem = linkedItems.get(currentItem);
        if(currentLinkedItem.nextLinkedItem !== undefined) {
            focusedCaretAtStart = true;
            focusedToDoItem = currentLinkedItem.nextLinkedItem.item;
        }
    }

    function onEnter(currentItem: Item) {
        addItemAfter(currentItem);
        focusNextItem(currentItem);
    }
    function onBackspace(currentItem: Item) {
        if(list.items.length !== 1) {
            focusPreviousItem(currentItem);
            deleteItem(currentItem);
        }
    }

    function focusFirstItem() {
        focusedTitle = false;
        focusedCaretAtStart = true;
        focusedToDoItem = firstLinkedListElement;
    }
</script>

<main>
    <SelectedListTitle bind:value={list.title}
                       disabled={!writable}
                       focused={focusedTitle}
                       onChange={() => sync()}
                       onEnter={() => focusFirstItem()}
                       goForward={() => focusFirstItem()}
                       placeholder="Write a title for your list..." />
    <div class="items">
        {#each list.items as currentItem}
            <SelectedListItem bind:content={currentItem.content}
                              bind:checked={currentItem.checked}
                              disabled={!writable}
                              focused={focusedToDoItem === currentItem}
                              focusedCaretAtStart={focusedCaretAtStart}
                              onChange={() => sync()}
                              onEnter={() => onEnter(currentItem)}
                              onBackspace={() => onBackspace(currentItem)}
                              goBack={() => focusPreviousItem(currentItem)}
                              goForward={() => focusNextItem(currentItem)}
                              placeholder={list.items.length === 1 ? "To-do..." : ""}
            />
        {/each}
    </div>
</main>

<style>
    main {
        margin: 2em auto;
        padding: 0 0.6em;
        max-width: 600px;
        width: 100%;
        box-sizing: border-box;
    }
</style>
