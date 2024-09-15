<script lang="ts">
    export let darkMode: boolean;
    let aboutVisible = true;
    function toggleAbout() {
        aboutVisible = !aboutVisible;
    }
</script>

<div class="about-section" class:dark-mode={darkMode}>
    <div class="about-header">
        <h2>About</h2>
        <button class="toggle-about" on:click={toggleAbout}>
            {aboutVisible ? "▼" : "▶"}
        </button>
    </div>
    {#if aboutVisible}
        <div class="about-content">
            <p>
                This website is designed to track and display the performance of
                players in GeoGuessr-like challenges set on private chats. It
                serves as a comprehensive speedrun table, offering a simple yet
                informative interface for challenge participants and spectators
                alike.
            </p>
            <h3>Features</h3>
            <ul>
                <li>Player completion times</li>
                <li>Links to challenge images</li>
                <li>Guessed locations and verification status</li>
                <li>Challenge dates and applicable rules</li>
            </ul>
            <h3>Purpose</h3>
            <ul>
                <li>Progress monitoring</li>
                <li>Result comparison</li>
                <li>Historical challenge data access</li>
            </ul>
            <h3>Functionality</h3>
            <ul>
                <li>Challenge posting with images</li>
                <li>Swift location identification by players</li>
                <li>Submission of guesses with proof</li>
                <li>
                    Time recording, submission verification, and leaderboard
                    updates
                </li>
                <li>Transparent recording of all attempts</li>
            </ul>
        </div>
    {/if}
</div>

<style>
    .about-section {
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
    .about-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
    }
    h2 {
        margin: 0;
    }
    .toggle-about {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #333;
    }
    .dark-mode .toggle-about {
        color: #fff;
    }
    .about-content {
        padding: 0 15px 15px;
    }
    ul,
    ol {
        margin: 0;
        padding: 0 0 0 20px;
    }
    li {
        margin-bottom: 5px;
    }
</style>
