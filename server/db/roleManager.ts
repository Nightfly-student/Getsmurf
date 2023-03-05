import { User } from "@prisma/client";
import { H3Event } from "h3";
import { sendError } from "h3";

export const isAdminOrAbove = (user: User, event: H3Event) => {
    if (user.roles.some((role) => role.roleName === "ADMIN")) {
        return;
    } else {
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: "Premission denied",
            })
        );
    }
};