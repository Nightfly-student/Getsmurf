import { getAffiliateByName } from "~~/server/db/affiliates";

export default defineEventHandler(async (event) => {
    const { name } = event.context.params;

    if (!name) {
        return ''
    }

    const affiliate = await getAffiliateByName(name as string)

    if (!affiliate) {
        return ''
    }

    return affiliate.name
});