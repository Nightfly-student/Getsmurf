import { sendError } from "h3";
import { getAffiliateRevenue, getRevenue } from "~~/server/db/orders";
import { isAffiliate } from "~~/server/db/roleManager";
import { getDates } from "~~/server/utils/dates";
import { isSameDay, format } from 'date-fns'

export default defineEventHandler(async (event) => {
    isAffiliate(event.context.auth?.user, event)

    const queries = getQuery(event);

    const { duration } = queries;

    if (!duration) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Missing duration requirement",
            })
        );
    }

    const start = new Date();
    const end = new Date();

    end.setHours(23, 59, 59, 999);

    if (duration === "day") {
        start.setHours(0, 0, 0, 0);
    } else if (duration === "week") {
        start.setDate(start.getDate() - 6);
        start.setHours(0, 0, 0, 0);
    } else if (duration === "month") {
        start.setDate(start.getDate() - 30);
        start.setHours(0, 0, 0, 0);
    }

    const revenue = await getAffiliateRevenue(start, end, event.context.auth?.user?.id);

    if (!revenue[0] || !revenue[1] || !revenue[2]) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Revenue not found",
            })
        );
    }

    if (duration !== "day") {
        const dateArray = getDates(start, end);

        const revenueArray: any = []
        dateArray.forEach((date) => {
            const found = revenue[1].filter((item) => isSameDay(new Date(item.createdAt), date))
            if (found.length === 0) {
                revenueArray.push(0)
            } else {
                found.forEach((item) => {
                    revenueArray.push(item.affiliateOrder?.recievingAmount)
                })
            }
        })

        return {
            labels: dateArray.map((date) => format(date, 'dd/MM')),
            revenue: (revenue[0]._sum.recievingAmount),
            data: revenueArray,
        }
    }

    // get array of each hour of the day
    const hours = Array.from({ length: 24 }, (_, i) => i);

    const revenueArray: any = []

    hours.forEach((hour) => {
        const found = revenue[1].filter((item) => new Date(item.createdAt).getHours() === hour)
        if (found.length === 0) {
            revenueArray.push(0)
        } else {
            found.forEach((item) => {
                revenueArray.push(item.affiliateOrder?.recievingAmount)
            })
        }
    })

    return {
        labels: hours,
        revenue: (revenue[0]._sum.recievingAmount),
        data: revenueArray,
    }
})