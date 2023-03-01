import { sendError } from "h3";
import { createManyAccounts } from "~~/server/db/accounts";
import { isAdminOrAbove } from "~~/server/db/roleManager";
import { upsertSupplier } from "~~/server/db/suppliers";
import { deleteMultipleKeys } from "~~/server/utils/redis/deleteMultiple";

export default defineEventHandler(async (event) => {
    isAdminOrAbove(event.context.auth?.user, event)
    const body = await readBody(event);

    const { supplier, accounts } = body;

    if (!supplier || !accounts) {
        return sendError(
            event,
            createError({ statusCode: 403, statusMessage: "Bad request" })
        );
    }

    await upsertSupplier(supplier)

    const result = await createManyAccounts(supplier, accounts);

    deleteMultipleKeys('getsmurf:product*')
    deleteMultipleKeys('getsmurf:products*')

    return result.length
});
