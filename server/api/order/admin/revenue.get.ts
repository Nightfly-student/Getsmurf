import { sendError } from "h3";
import { getRevenue } from "~~/server/db/orders";
import { isAdminOrAbove } from "~~/server/db/roleManager";
import { getDates } from "~~/server/utils/dates";
import { isSameDay, format, parseISO } from 'date-fns'

export default defineEventHandler(async (event) => {
    isAdminOrAbove(event.context.auth?.user, event)

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

    const revenue = await getRevenue(start, end);

    if (!revenue[0] || !revenue[1]) {
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
                    revenueArray.push(item.total)
                })
            }
        })

        return {
            labels: dateArray.map((date) => format(date, 'dd/MM')),
            revenue: revenue[0],
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
                revenueArray.push(item.total)
            })
        }
    })

    return {
        labels: hours,
        revenue: revenue[0],
        data: revenueArray,
    }
})