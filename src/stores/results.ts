import { readable } from "svelte/store";
import type { SpeedRunResult } from "$lib/types/SpeedRunResult";
import resultsData from "$lib/data/results.json";

export const results = readable<SpeedRunResult[]>(resultsData);
