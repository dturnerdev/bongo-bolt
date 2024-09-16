<script lang="ts">
    export let imageUrl: string;
    export let isOpen: boolean;
    export let onClose: () => void;
    export let darkMode: boolean;

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && isOpen) {
            onClose();
        }
    }
</script>

{#if isOpen}
    <div class="modal-backdrop" role="presentation">
        <dialog
            class="modal-content"
            class:dark-mode={darkMode}
            open
            aria-labelledby="modal-title"
        >
            <button
                class="close-button"
                on:click={onClose}
                aria-label="Close modal"
            >
                <i class="fas fa-times" aria-hidden="true"></i>
            </button>
            <h2 id="modal-title" class="sr-only">Speed Run Result Image</h2>
            <img src={imageUrl} alt="Speed run result" />
        </dialog>
    </div>
{/if}

<svelte:window on:keydown={handleKeydown} />

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background-color: white;
        padding: 5px;
        border-radius: 5px;
        max-width: 90%;
        max-height: 90%;
        overflow: auto;
        position: relative;
    }

    .modal-content.dark-mode {
        background-color: white;
    }

    img {
        max-width: 100%;
        max-height: 80vh;
        display: block;
        margin: 0 auto;
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: #ff4136;
        color: white;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 16px;
    }

    .close-button:hover {
        background-color: #ff1a1a;
    }

    .dark-mode .close-button {
        background-color: #d63031;
    }

    .dark-mode .close-button:hover {
        background-color: #e17055;
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }

    dialog.modal-content {
        border: none;
        border-radius: 0.5em;
    }

    dialog.modal-content::backdrop {
        background: rgba(0, 0, 0, 0.5);
    }
</style>
