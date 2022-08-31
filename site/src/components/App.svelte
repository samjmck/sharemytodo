<script lang="ts">
    import SelectedList from "./SelectedList.svelte";
    import Lists from "./ListsMenu.svelte";
    import Actions from "./Actions.svelte";
    import WebsiteLink from "./WebsiteLink.svelte";
</script>

<Lists />
<SelectedList />
<Actions />
<WebsiteLink />

<style>
    :root {
        font-size: 1.2em;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
    @media screen and (max-width: 450px) {
        :root {
            font-size: 1.3em;
        }
    }
    :global(body) {
        margin: 0;
    }
</style>
