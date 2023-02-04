import { sendError } from "h3";
import { constructStripeCheckoutSession, handleStripeEvent } from "~~/server/utils/stripe";

//handle stripe webhook
export default defineEventHandler(async (event) => {
    const body = await readRawBody(event);
    const sig = getHeader(event, "stripe-signature");

    if (!body || !sig) {
        return sendError(event, createError({ statusCode: 500, statusMessage: "Stripe webhook error | No Content" }));
    }

    const stripeEvent = await constructStripeCheckoutSession(body, sig);

    if (!stripeEvent) {
        return sendError(event, createError({ statusCode: 500, statusMessage: "Stripe webhook error | No Stripe Event" }));
    }

    return await handleStripeEvent(stripeEvent, event);
});