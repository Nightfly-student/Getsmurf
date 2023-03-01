import { sendError } from "h3";
import { upsertChampions } from "~~/server/db/champions";
import { upsertSkins } from "~~/server/db/skins";
import { deleteMultipleKeys } from "~~/server/utils/redis/deleteMultiple";
export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { key } = body;

    if (key !== "cronjob") {
        return sendError(
            event,
            createError({ statusCode: 403, statusMessage: "Unauthorized" })
        );
    }

    deleteMultipleKeys('getsmurf:champions')

    const versionData: any[] = await $fetch("https://ddragon.leagueoflegends.com/api/versions.json");

    const version = '12.22.1';

    const championsData: any = await $fetch(
        `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
    );

    const champions = Object.keys(championsData.data).map((key: any) => ({
        identifier: championsData.data[key].key,
        name: championsData.data[key].id === 'MonkeyKing' ? 'Wukong' : championsData.data[key].id,
        image: `https://cdn.communitydragon.org/${version}/champion/${championsData.data[key].key}/square`,
    }));

    const champs = await upsertChampions(champions)

    const championSkins = await Promise.all(
        Object.keys(championsData.data).map(async (key: any) => {
            var championInformationData: any = await delayFetch(
                `https://cdn.communitydragon.org/${version}/champion/${championsData.data[key].key}/data`,
                { delay: 200 }
            );
            var championSkinsArray: any = championInformationData.skins.map(
                (skin: any, index: number) => {
                    if (!skin.isBase) {
                        return {
                            name: skin.name.includes(':') ? skin.name.replaceAll(':', '') : skin.name,
                            identifier: skin.id.toString(),
                            image: `https://cdn.communitydragon.org/${version}/champion/${championsData.data[key].key}/portrait/skin/${skin.loadScreenPath.split('/')[7].toLowerCase().replace('skin', '')}`,
                            rarity: skin.rarity,
                            key: championsData.data[key].id === 'MonkeyKing' ? 'Wukong' : championsData.data[key].id,
                        };
                    } else {
                        return undefined;
                    }
                }
            );
            return championSkinsArray;
        })
    );
    const skins = await upsertSkins(Array.prototype.concat(...championSkins).filter(Boolean))

    return {
        message: `successfully added ${champs.length} champions and ${skins.length} skins`
    };
});

const delayFetch = (url: any, options: any) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve($fetch(url));
        }, options.delay);
    });