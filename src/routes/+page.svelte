<script lang="ts">
    import { onMount } from "svelte";
    import ResultsTable from "$lib/components/ResultsTable.svelte";
    import RulesSection from "$lib/components/RulesSection.svelte";
    import { writable } from "svelte/store";
    import AboutSection from "$lib/components/AboutSection.svelte";

    const darkMode = writable(false);

    function toggleDarkMode() {
        darkMode.update((value) => !value);
        if ($darkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }

    onMount(() => {
        const prefersDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;
        darkMode.set(prefersDarkMode);
        if (prefersDarkMode) {
            document.body.classList.add("dark-mode");
        }

        // Listen for changes in system color scheme preference
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", (e) => {
                darkMode.set(e.matches);
                if (e.matches) {
                    document.body.classList.add("dark-mode");
                } else {
                    document.body.classList.remove("dark-mode");
                }
            });
    });
</script>

<svelte:head>
    <title>Bongo Bolt</title>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
</svelte:head>

<main>
    <div class="container">
        <div class="header">
            <h1>Bongo Bolt</h1>
            <button class="dark-mode-toggle" on:click={toggleDarkMode}>
                {#if $darkMode}
                    <i class="fas fa-sun"></i>
                {:else}
                    <i class="fas fa-moon"></i>
                {/if}
            </button>
        </div>

        <AboutSection darkMode={$darkMode} />

        <RulesSection darkMode={$darkMode} />

        <ResultsTable darkMode={$darkMode} />
    </div>
</main>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        transition:
            background-color 0.3s,
            color 0.3s;
    }

    :global(body.dark-mode) {
        background-color: #1a1a1a;
        color: #fff;
    }

    main {
        font-family: Arial, sans-serif;
        min-height: 100vh;
    }

    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    h1 {
        color: #333;
        margin: 0;
    }

    .dark-mode-toggle {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #333;
    }

    :global(body.dark-mode) h1,
    :global(body.dark-mode) .dark-mode-toggle {
        color: #fff;
    }

    @media (max-width: 600px) {
        .container {
            padding: 20px;
        }

        .dark-mode-toggle {
            position: absolute;
            top: 20px;
            right: 20px;
        }
    }
</style>
