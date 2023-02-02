import { getChampions } from "~~/server/db/champions";

export default defineEventHandler(async (event) => {
    const champions = await getChampions();

    return champions
})