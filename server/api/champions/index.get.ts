import { getChampions } from "~~/server/db/champions";
import redis from "~~/server/utils/redis";

export default defineEventHandler(async (event) => {
    const champions = await getChampions();

    const cached = await redis.get(`getsmurf:champions`);

    if (cached) {
        return JSON.parse(cached)
    }

    await redis.setex(`getsmurf:champions`, 60 * 60 * 168, JSON.stringify(champions))

    return champions
})