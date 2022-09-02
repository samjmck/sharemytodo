<script lang="ts">
    import { openShareDialog } from "../stores";

    export let value: string;
    export let placeholder: string;
    export let disabled: boolean;
    export let focused: boolean;
    export let onChange: () => void;
    export let onEnter: () => void;
    export let goForward: () => void;

    let inputElement: HTMLInputElement;

    function onKeydown(event: KeyboardEvent) {
        if(event.key === "Enter" && !event.shiftKey) {
            onEnter();
            event.preventDefault();
        } else if(event.key === "ArrowRight" && inputElement.selectionStart === inputElement.value.length) {
            goForward();
            event.preventDefault();
        }
    }

    let previousValue = value;
    $: {
        if(value !== previousValue) {
            onChange();
            previousValue = value;
        }
    }

    $: {
        if(inputElement !== undefined) {
            if(focused) {
                inputElement.focus();
                inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);
            } else {
                inputElement.blur();
            }
        }
    }
</script>

<div class="selected-title-container">
    <input bind:this={inputElement}
           bind:value={value}
           on:keydown={onKeydown}
           disabled={disabled}
           spellcheck="false"
           type="text"
           placeholder={placeholder}
    />
    <svg on:click={() => $openShareDialog = true} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
</div>

<style>
    div.selected-title-container {
        display: flex;
        flex-direction: row;
    }
    input {
        size: inherit;
        color: inherit;
        font-family: inherit;
        outline: none;
        background-color: inherit;
        overflow-y: hidden;
        flex: 1;
        font-size: 1em;
        border: none;
        margin-bottom: 0.5em;
    }
    @media screen and (max-width: 1175px) {
        svg {
            display: none;
        }
    }
    svg {
        cursor: pointer;
    }
</style>
