import { sendError } from "h3";
import { getChampionAndSkinsAndAvailableSkins } from "~~/server/db/champions";

export default defineEventHandler(async (event) => {
    const { champion } = event.context.params;

    const queries = getQuery(event);

    const { region } = queries;

    if (!champion || !region) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Champion and region are required",
            })
        );
    }

    const data = await getChampionAndSkinsAndAvailableSkins(champion, region as string);

    return {
        champion: data[0],
        accounts: data[1],
    }
})