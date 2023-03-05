import { sendError } from "h3";
import { isAdminOrAbove } from "~~/server/db/roleManager";
import { upsertRole } from "~~/server/db/users";

export default defineEventHandler(async (event) => {
    isAdminOrAbove(event.context.auth?.user, event)

    const body = await readBody(event);

    const { email, role } = body;

    if (!email || !role) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Missing role, or email requirement",
            })
        );
    }

    const updateUser = await upsertRole(email, role)

    if (!updateUser) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Failed to update user",
            })
        );
    }

    return {
        message: "User updated"
    }
})