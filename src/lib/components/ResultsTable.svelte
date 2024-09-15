<script lang="ts">
    import { onMount } from "svelte";
    import { results } from "../stores/results";
    import ImageModal from "./ImageModal.svelte";
    import { formatDistanceToNow, format } from "date-fns";

    let selectedImage: string | null = null;
    let tableContainer: HTMLElement;
    let isDragging = false;
    let startX: number;
    let scrollLeft: number;

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const distanceString = formatDistanceToNow(date, { addSuffix: true });
        const exactDate = format(date, "MMMM d, yyyy");
        const formattedDistance = distanceString.replace("about ", "~");
        return { distanceString: formattedDistance, exactDate };
    }

    export let darkMode: boolean;

    function onMouseDown(e: MouseEvent) {
        isDragging = true;
        startX = e.pageX - tableContainer.offsetLeft;
        scrollLeft = tableContainer.scrollLeft;
        tableContainer.style.cursor = "grabbing";
    }

    function onMouseUp() {
        isDragging = false;
        tableContainer.style.cursor = "grab";
    }

    function onMouseMove(e: MouseEvent) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - tableContainer.offsetLeft;
        const walk = (x - startX) * 2;
        tableContainer.scrollLeft = scrollLeft - walk;
    }

    function handleImageClick(imageUrl: string) {
        selectedImage = imageUrl;
    }

    onMount(() => {
        tableContainer.style.cursor = "grab";
        tableContainer.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("mousemove", onMouseMove);

        return () => {
            tableContainer.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("mousemove", onMouseMove);
        };
    });

    $: sortedResults = [...$results].sort((a, b) => {
        const timeA = a.time
            .split(":")
            .reduce((acc, time) => 60 * acc + +time, 0);
        const timeB = b.time
            .split(":")
            .reduce((acc, time) => 60 * acc + +time, 0);
        return timeA - timeB;
    });
</script>

<div
    class="table-container"
    class:dark-mode={darkMode}
    bind:this={tableContainer}
>
    <table>
        <thead>
            <tr>
                <th class="sticky-col">Player</th>
                <th class="center-column">Time</th>
                <th class="center-column">Date</th>
                <th class="center-column narrow-column">Image</th>
                <th class="center-column narrow-column">Location</th>
                <th class="center-column narrow-column">Verified</th>
                <th class="center-column narrow-column">Rules</th>
            </tr>
        </thead>
        <tbody>
            {#each sortedResults as result, index}
                {@const { distanceString, exactDate } = formatDate(result.date)}
                <tr class={index % 2 === 0 ? "even-row" : "odd-row"}>
                    <td class="sticky-col">{result.player}</td>
                    <td class="center-column">{result.time}</td>
                    <td class="center-column">
                        <div class="date-container">
                            <span>{distanceString}</span>
                            <div class="tooltip">{exactDate}</div>
                        </div>
                    </td>
                    <td class="center-column">
                        <i
                            class="fas fa-image icon-button"
                            on:click={() => handleImageClick(result.imageUrl)}
                        ></i>
                    </td>
                    <td class="center-column">
                        <a
                            href={result.locationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="icon-link"
                        >
                            <i class="fas fa-map-marker-alt"></i>
                        </a>
                    </td>
                    <td class="center-column">
                        <div class="icon-container">
                            {#if result.verified}
                                <i
                                    class="fas fa-check-circle"
                                    style="color: #28a745;"
                                ></i>
                            {:else}
                                <i
                                    class="fas fa-times-circle"
                                    style="color: #dc3545;"
                                ></i>
                            {/if}
                        </div>
                    </td>
                    <td class="center-column">{result.rule}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<ImageModal
    imageUrl={selectedImage || ""}
    isOpen={!!selectedImage}
    onClose={() => (selectedImage = null)}
    {darkMode}
/>

<style>
    .table-container {
        width: 100%;
        overflow-x: auto;
        position: relative;
        background-color: #ffffff;
        border-radius: 5px;
        box-shadow:
            0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        user-select: none;
    }

    .table-container.dark-mode {
        background-color: #333;
    }

    table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        font-family: Arial, sans-serif;
    }

    th,
    td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        white-space: nowrap;
    }

    th {
        background-color: #f2f2f2;
        font-weight: bold;
        position: sticky;
        top: 0;
        z-index: 10;
    }

    th:first-child {
        border-top-left-radius: 5px;
    }

    th:last-child {
        border-top-right-radius: 5px;
    }

    .sticky-col {
        position: sticky;
        left: 0;
        background-color: inherit;
        z-index: 5;
    }

    th.sticky-col {
        z-index: 15;
        background-color: #f2f2f2;
    }

    td.sticky-col {
        background-color: #ffffff;
    }

    .odd-row td.sticky-col {
        background-color: #f8f9fa;
    }

    .even-row {
        background-color: #ffffff;
    }

    .odd-row {
        background-color: #f8f9fa;
    }

    .date-container {
        position: relative;
        display: inline-block;
    }

    .tooltip {
        visibility: hidden;
        background-color: #333;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 10px;
        position: absolute;
        z-index: 20;
        bottom: 125%;
        left: 50%;
        margin-left: -60px;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .date-container:hover .tooltip {
        visibility: visible;
        opacity: 1;
    }

    .center-column {
        text-align: center;
    }

    .narrow-column {
        width: 1%;
        white-space: nowrap;
    }

    .icon-button,
    .icon-link {
        cursor: pointer;
        transition: color 0.3s;
        padding: 0 5px;
    }

    .icon-button {
        color: #007bff;
    }

    .icon-link {
        color: #711af8;
        text-decoration: none;
    }

    .icon-button:hover,
    .icon-link:hover {
        opacity: 0.8;
    }

    i {
        font-size: 20px;
    }

    .icon-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .dark-mode {
        color: #fff;
    }

    .dark-mode th {
        background-color: #444;
        color: #fff;
    }

    .dark-mode th.sticky-col {
        background-color: #444;
    }

    .dark-mode td.sticky-col {
        background-color: #2c2c2c;
    }

    .dark-mode .odd-row td.sticky-col {
        background-color: #383838;
    }

    .dark-mode .even-row {
        background-color: #2c2c2c;
    }

    .dark-mode .odd-row {
        background-color: #383838;
    }

    .dark-mode .tooltip {
        background-color: #555;
        color: #fff;
    }

    .dark-mode td {
        border-bottom-color: #555;
    }
</style>
