<script lang="ts">
    import { getCachedJwt } from "../sync/cache";
    import { getSharePath } from "../sync/server";
    import { openShareDialog, selectedList } from "../stores";
    import { isShared } from "../types.js";

    let notWritableUrl;
    let writableUrl;
    $: {
        if(!isShared($selectedList)) {
            if($selectedList.uuid) {
                getSharePath(getCachedJwt(), $selectedList, false).then(sharePath => notWritableUrl = `${window.location.origin}${sharePath}`);
                getSharePath(getCachedJwt(), $selectedList, true).then(sharePath => writableUrl = `${window.location.origin}${sharePath}`);
            }
        } else {
            if($selectedList.writable) {
                writableUrl = window.location.href;
            } else {
                notWritableUrl = window.location.href;
            }
        }
    }

    let isCopiedMessageHidden = true;
    function showCopiedMessage() {
        isCopiedMessageHidden = false;
        setTimeout(() => {
            isCopiedMessageHidden = true;
        }, 5000);
    }
    function copyNotWritableUrl() {
        navigator.clipboard.writeText(notWritableUrl);
        showCopiedMessage();
    }
    function copyWritableUrl() {
        navigator.clipboard.writeText(writableUrl);
        showCopiedMessage();
    }
    function close() {
        $openShareDialog = false;
    }
</script>

<div class="dialog-container" class:open={$openShareDialog}>
    <div class="dialog">
        <div class="dialog-header">
            <span>Share list</span>
            <button class="close" on:click={close}>Close</button>
        </div>
        {#if notWritableUrl}
            <button class="copy-link" on:click={copyNotWritableUrl}>Copy link to non-editable version</button>
        {/if}
        {#if writableUrl}
            <button class="copy-link" on:click={copyWritableUrl}>Copy link to editable version</button>
        {/if}
        <p class="message" class:hidden={isCopiedMessageHidden}>Link copied!</p>
    </div>
</div>

<style>
    p.message {
        font-size: 0.8em;
        opacity: 1;
        will-change: opacity;
        margin: 0.3em 0;
    }
    p.message.hidden {
        opacity: 0;
        transition: 2s ease-in-out opacity;
    }
    label, span {
        margin: 0.3em 0;
    }
    span.link-value {
        width: 16em;
        border: 1px solid #c3c3c3;
        color: #666666;
        border-radius: 7px;
        padding: 0.3em;
        font-size: 0.85em;
    }
    div.dialog-container {
        background-color: rgba(255, 255, 255, 0.90);
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 4;
        display: none;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    div.dialog-container.open {
        display: flex;
    }
    div.dialog {
        padding: 0.7em;
        z-index: 2;
        width: fit-content;
        background-color: #ffffff;
        border-radius: 0.3em;
        border: 1px solid #c3c3c3;
        box-shadow: 0 0 1em 4px rgba(0, 0, 0, 0.1);
    }
    div.dialog-header {
        margin-bottom: 1em;
    }
    div.link {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    div.link input {
        flex: 1;
    }
    button.copy-link {
        padding: 0.3em;
        height: 2em;
        margin-right: 0.5em;
    }
    button.close {
        transform: scale(1.15);
        float: right;
    }
</style>
