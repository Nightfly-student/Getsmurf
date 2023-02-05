import formidable from "formidable";
import { isAdminOrAbove } from "~~/server/db/roleManager"
import { sendError } from "h3";
import { object, string } from "yup";
import filter from "leo-profanity";
import { uploadImageToCloudinary } from "~~/server/utils/cloudinary";
import { createBlog } from "~~/server/db/blogs";

export default defineEventHandler(async (event) => {
    isAdminOrAbove(event.context.auth?.user, event)

    const form = formidable({});

    const response = await new Promise<{ fields: any; file: any }>(
        (resolve, reject) => {
            form.parse(event.req, (err: any, fields, file: any) => {
                if (err) {
                    reject(err);
                }
                resolve({ fields, file });
            });
        }
    );

    const { fields, file } = response;

    if (!file) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "No Image Found",
            })
        );
    }

    let {
        title,
        content,
        status,
        category,
        metaTitle,
        metaDescription,
        urlImage,
        id
    } = fields;

    if (!id) {
        id = title.replaceAll(' ', '-').toLowerCase()
    }

    try {
        await schema.validate({
            title,
            status,
            category,
            metaTitle,
            metaDescription,
        });
    } catch (err: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: err.message })
        );
    }

    if (filter.check(title) || filter.check(content) || filter.check(metaTitle) || filter.check(metaDescription)) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Profanity is not allowed",
            })
        );
    }

    let image = ''

    if (!urlImage) {
        const key = Object.keys(file);

        const f = file[key[0]];

        if (f.bytes > 1000000) {
            return sendError(
                event,
                createError({
                    statusCode: 404,
                    statusMessage: "File is too big",
                })
            );
        }

        if (
            !f.originalFilename.includes(".jpg") &&
            !f.originalFilename.includes("jpeg") &&
            !f.originalFilename.includes("png")
        ) {
            return sendError(
                event,
                createError({
                    statusCode: 404,
                    statusMessage: "File type not supported",
                })
            );
        }
        const cloudinaryResource = await uploadImageToCloudinary(f.filepath);

        image = cloudinaryResource.secure_url
    } else {
        image = urlImage
    }

    try {
        const blogData = {
            title,
            content,
            status,
            category,
            metaTitle,
            metaDescription,
            image,
            userId: event.context.auth?.user.id,
            id
        }

        const blog = await createBlog(blogData);

        return {
            blog,
        };
    } catch (err: any) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: err.response.message,
            })
        )
    }

})

const schema = object({
    metaTitle: string().required(),
    metaDescription: string().required().max(160),
    title: string().required().max(120),
    category: string().required(),
    status: string().required(),
});