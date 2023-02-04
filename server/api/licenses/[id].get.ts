import { sendError } from "h3";
import { getLicensesByOrderId } from "~~/server/db/licences";
import CryptoJS from "crypto-js";

export default defineEventHandler(async (event) => {
    const { id } = event.context.params;

    const config = useRuntimeConfig()

    if (!id) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Missing id requirement",
            })
        );
    }

    const licenses = await getLicensesByOrderId(id as string);

    if (!licenses) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "No Order found",
            })
        );
    }

    licenses.map((license) => {
        license.password = CryptoJS.AES.decrypt(license.password, config.aesKey).toString(CryptoJS.enc.Utf8)
        return license
    })

    return licenses;
});