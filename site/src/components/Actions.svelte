<script lang="ts">
    import { openListsMenu, openShareDialog } from "../stores.js";
</script>

<div>
    <svg on:click={() => $openShareDialog = !$openShareDialog} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
    <svg on:click={() => $openListsMenu = !$openListsMenu} xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
</div>

<style>
    a {
        text-decoration: none;
        color: #919191;
        font-size: 0.9em;
    }
    div {
        background-color: rgba(255, 255, 255, 0.8);
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
        margin: 1em auto;
        padding: 0 0.6em;
        max-width: 600px;
        width: 100%;
        box-sizing: border-box;
        display: none;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    svg {
        cursor: pointer;
    }
    @media screen and (max-width: 1175px) {
        div {
            display: flex;
        }
    }
</style>
