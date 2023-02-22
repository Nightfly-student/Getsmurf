import { Account, AccountStatus, Region } from "@prisma/client";
import { sendError } from "h3";
import { getAccountBySkinAndRegion, getAccountBySlug, updateStatusOfAccount } from "~~/server/db/accounts";
import { addAccountToOrder, getOrderAdmin, updateOrderSkin } from "~~/server/db/orders";
import { isAdminOrAbove } from "~~/server/db/roleManager";
import { sendOrderReplacementEmail } from "~~/server/utils/mailing/orderReplaced";

export default defineEventHandler(async (event) => {
    isAdminOrAbove(event.context.auth?.user, event)

    const config = useRuntimeConfig()

    const body = await readBody(event);

    const { reason, replacement, currentAccount, skin, orderId, region } = body;

    if (!reason || !replacement || !currentAccount || !orderId || !region) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Missing requirement",
            })
        );
    }

    var replacementAccount: any | null = null

    const order = await getOrderAdmin(orderId)

    if (!order) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Order not found",
            })
        );
    }

    if (order.status !== 'PAID') {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Order not paid",
            })
        );
    }

    if (!order.accounts.some(account => account.id === currentAccount)) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Account not found in order",
            })
        );
    }

    if (skin) {
        replacementAccount = await getAccountBySkinAndRegion(region as Region, replacement)

        if (replacementAccount != null) {
            await updateStatusOfAccount(currentAccount, reason as AccountStatus)
            await updateStatusOfAccount(replacementAccount.id, 'REFUND')

            await addAccountToOrder(orderId, replacementAccount.id)

            const arrayOfAccounts = []
            arrayOfAccounts.push(replacementAccount)

            await sendOrderReplacementEmail(order.billingEmail, order.id, arrayOfAccounts, `${replacementAccount.Skins[0].skinName} - ${region}`, `${config.url}/orders/${order.id}`)
        }
    }

    if (!skin) {
        replacementAccount = await getAccountBySlug(replacement)

        if (replacementAccount != null) {
            await updateStatusOfAccount(currentAccount, reason as AccountStatus)
            await updateStatusOfAccount(replacementAccount.id, 'REFUND')

            await addAccountToOrder(orderId, replacementAccount.id)

            const arrayOfAccounts = []
            arrayOfAccounts.push(replacementAccount)

            await sendOrderReplacementEmail(order.billingEmail, order.id, arrayOfAccounts, replacementAccount.Product.name, `${config.url}/orders/${order.id}`)

        }
    }

    return replacementAccount

})
