<script lang="ts">
    export let darkMode: boolean;
    let rulesVisible = true;

    function toggleRules() {
        rulesVisible = !rulesVisible;
    }
</script>

<div class="rules-section" class:dark-mode={darkMode}>
    <div class="rules-header">
        <h2>Rules v1.0</h2>
        <button class="toggle-rules" on:click={toggleRules}>
            {rulesVisible ? "▼" : "▶"}
        </button>
    </div>
    {#if rulesVisible}
        <ul>
            <li>
                Challenge images can be posted at any time but must be
                accompanied by a challenge message.
            </li>
            <li>
                Timing starts when the challenge message is posted and ends when
                proof is submitted (preferably a Google Maps link).
            </li>
            <li>
                All attempts, including unsuccessful ones, remain visible to
                encourage accuracy.
            </li>
            <li>
                Submissions must include verifiable evidence (e.g., map link,
                screenshot, or equivalent).
            </li>
            <li>
                Participants may use any resources or tools to solve the
                challenge - no restrictions apply.
            </li>
        </ul>
    {/if}
</div>

<style>
    .rules-section {
        background-color: #f8f9fa;
        border-radius: 5px;
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 20px;
        box-shadow:
            0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        overflow: hidden;
    }

    .dark-mode {
        background-color: #2c2c2c;
    }

    .rules-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
    }

    h2 {
        margin: 0;
    }

    .toggle-rules {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #333;
    }

    .dark-mode .toggle-rules {
        color: #fff;
    }

    ul {
        margin: 0;
        padding: 0 15px 15px 35px;
    }

    li {
        margin-bottom: 5px;
    }
</style>
