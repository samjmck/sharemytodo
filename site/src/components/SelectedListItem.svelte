<script lang="ts">
    export let checked: boolean;
    export let content: string;
    export let disabled: boolean;
    export let focused: boolean;
    export let focusedCaretAtStart: boolean;
    export let placeholder: string;
    export let onChange: () => void;
    export let onEnter: () => void;
    export let onBackspace: () => void;
    export let goBack: () => void;
    export let goForward: () => void;

    let textAreaElement: HTMLTextAreaElement;

    function onKeydown(event: KeyboardEvent) {
        if(event.key === "Enter" && !event.shiftKey) {
            onEnter();
            onChange();
            event.preventDefault();
        } else if(event.key === "Backspace" && textAreaElement.value === "") {
            onBackspace();
            onChange();
            event.preventDefault();
        } else if(event.key === "ArrowLeft" && textAreaElement.selectionStart == 0) {
            goBack();
            event.preventDefault();
        } else if(event.key === "ArrowRight" && textAreaElement.selectionStart === textAreaElement.value.length) {
            goForward();
            event.preventDefault();
        }
    }

    let previousContent = content;
    $: {
        if(content !== previousContent) {
            onChange();
            previousContent = content;
        }
    }

    $: {
        if(textAreaElement !== undefined) {
            if(focused) {
                textAreaElement.focus();
                if(focusedCaretAtStart) {
                    textAreaElement.setSelectionRange(0, 0);
                } else {
                    textAreaElement.setSelectionRange(textAreaElement.value.length, textAreaElement.value.length);
                }
            } else {
                textAreaElement.blur();
            }
        }
    }
</script>

<div>
    <input type="checkbox" bind:checked={checked} on:input={onChange} disabled={disabled} />
    <label class="input-sizer stacked">
        <textarea bind:this={textAreaElement}
                  bind:value={content}
                  on:keydown={onKeydown}
                  disabled={disabled}
                  spellcheck="false"
                  oninput="this.parentNode.dataset.value = this.value"
                  placeholder={placeholder}
                  rows="1"
        ></textarea>
    </label>
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0.3em 0;
    }
    textarea {
        size: inherit;
        color: inherit;
        font-family: inherit;
        outline: none;
        background-color: inherit;
        overflow-y: hidden;
        border: 1px solid black;
        width: 100%;
    }

    input[type="checkbox"] {
        transform: scale(1.2);
    }
    /* For auto-resizing textarea
       Code from https://codepen.io/shshaw/pen/bGNJJBE
       Thank you Shaw
     */
    .input-sizer {
        display: inline-grid;
        vertical-align: top;
        align-items: center;
        position: relative;
        overflow-y: hidden;
    }
    .input-sizer.stacked {
        padding: 0.1em 0.5em;
        align-items: stretch;
    }
    .input-sizer.stacked::after,
    .input-sizer.stacked textarea {
        grid-area: 2/1;
    }
    .input-sizer::after,
    .input-sizer textarea {
        width: auto;
        min-width: 1em;
        grid-area: 1/2;
        font: inherit;
        margin: 0;
        resize: none;
        background: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: none;
    }
    .input-sizer::after {
        content: attr(data-value) " ";
        visibility: hidden;
        white-space: pre-wrap;
    }
</style>
