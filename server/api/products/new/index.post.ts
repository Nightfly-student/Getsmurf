import formidable from "formidable";
import { sendError } from "h3";
import { isAdminOrAbove } from "~~/server/db/roleManager";
import { object, string, number } from "yup";
import { createProduct } from "~~/server/db/products";
import { deleteMultipleKeys } from "~~/server/utils/redis/deleteMultiple";

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

    const { title, slug, description, category, price, region, identifier } = fields;

    if (!title || !slug || !description || !category || !price || !region || !identifier) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "All fields are required",
            })
        );
    }

    try {
        await schema.validate({ title, slug, category, price, region, identifier });
    } catch (err) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: 'All fields are required',
            })
        );
    }

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

    try {
        const cloudinary = await uploadImageToCloudinary(f.filepath)

        const product = await createProduct({
            title,
            slug,
            description,
            category,
            price,
            region,
            identifier,
            image: cloudinary.secure_url,
        })

        deleteMultipleKeys('getsmurf:product*')
        deleteMultipleKeys('getsmurf:products*')

        return product
    } catch (err: any) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: err.response
            })
        );
    }
})

const schema = object({
    title: string().required("Title is required"),
    slug: string().required("Slug is required"),
    price: number().min(1).max(100000).required("Price is required"),
    category: string().required("Category is required"),
    region: string().required("Region is required"),
    identifier: string().required("Identifier is required"),
});
