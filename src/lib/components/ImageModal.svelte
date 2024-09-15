<script lang="ts">
    export let imageUrl: string;
    export let isOpen: boolean;
    export let onClose: () => void;
    export let darkMode: boolean;
</script>

{#if isOpen}
    <div class="modal-backdrop" on:click={onClose}>
        <div
            class="modal-content"
            class:dark-mode={darkMode}
            on:click|stopPropagation
        >
            <button class="close-button" on:click={onClose}>
                <i class="fas fa-times"></i>
            </button>
            <img src={imageUrl} alt="Speed run result" />
        </div>
    </div>
{/if}

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
        padding: 10px;
        border-radius: 5px;
        max-width: 90%;
        max-height: 90%;
        overflow: auto;
        position: relative;
    }

    .modal-content.dark-mode {
        background-color: #333;
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
</style>
