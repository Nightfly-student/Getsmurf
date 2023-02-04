import { sendError } from "h3";
import { getPaymentSessionByOrderId } from "~~/server/db/paymentSessions";
import { getStripeSession } from "~~/server/utils/stripe";

export default defineEventHandler(async (event) => {
    const { id } = event.context.params;

    if (!id) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Missing id requirement",
            })
        );
    }

    const order = await getPaymentSessionByOrderId(id as string);

    if (!order) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "No Order found",
            })
        );
    }

    if (!order.paymentSession) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "No Payment Session found",
            })
        );
    }

    let url = null

    if (order.paymentSession.paymentMethod === 'STRIPE') {
        const session = await getStripeSession(order.paymentSession.sessionId);

        if (!session) {
            return sendError(
                event,
                createError({
                    statusCode: 404,
                    statusMessage: "No Stripe Session found",
                })
            );
        }

        url = session.url;
    }

    if (!url) {
        return {
            url: null
        }
    };

    return {
        url
    }

})