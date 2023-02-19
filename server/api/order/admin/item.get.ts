import { sendError } from "h3";
import { getOrderAdmin, getOrdersAdmin } from "~~/server/db/orders";
import { isAdminOrAbove } from "~~/server/db/roleManager";
import CryptoJS from "crypto-js";


export default defineEventHandler(async (event) => {
    isAdminOrAbove(event.context.auth?.user, event)
    const queries = getQuery(event);
    const config = useRuntimeConfig()

    const { id } = queries;

    if (!id) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Missing requirement",
            })
        );
    }

    const order = await getOrderAdmin(id as string)

    if (!order) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Order not found",
            })
        );
    }

    if (order.status === 'PAID') {
        for (const account of order.accounts) {
            const decrypted = CryptoJS.AES.decrypt(account.license.password, config.aesKey as string).toString(CryptoJS.enc.Utf8)
            account.license.password = decrypted
        }
    }

    return order

})