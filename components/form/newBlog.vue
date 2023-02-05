<template>
    <div class="grid grid-cols-12 space-y-5 justify-center pb-5">
        <VForm v-slot="{ values, meta: formMeta }" :initial-values="initialValues" :validation-schema="schema"
            class="col-span-12 grid grid-cols-12 gap-5 pt-10 justify-center items-center">
            <div v-if="data.errorMsg" class="col-span-12">
                <div class="bg-light-50/20 p-2 py-3 text-center rounded-20">
                    <p>{{ data.errorMsg }}</p>
                </div>
            </div>

            <div class="col-span-12 md:col-span-9 grid grid-cols-12 gap-5 self-start">
                <div class="col-span-12">
                    <label class="pl-2 text-gray-500">Title</label>
                    <Input class="mt-1" :required="true" :disabled="data.loading" name="title" placeholder="Title" />
                </div>
                <div class="col-span-12">
                    <label class="pl-2 text-gray-500">Content</label>
                    <InputQuill name="content" />
                </div>
            </div>

            <div class="col-span-12 md:col-span-3">
                <label class="pl-2 text-gray-500">Image</label>
                <InputImage name="image" :required="true" :disabled="data.loading">
                    <label for="image">
                        <div class="relative mx-auto cursor-pointer">
                            <div
                                class="relative shadow-lg rounded-20 bg-zinc-800 h-64 max-item transform hover:cursor-pointer">
                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                    v-if="!values.image">
                                    <p>Add image</p>
                                </div>
                                <img v-else class="object-cover z-0 rounded-20 h-full w-full"
                                    :src="fileObjectToUrl(values.image)" />
                            </div>
                        </div>
                    </label>
                </InputImage>
            </div>

            <div class="col-span-12 md:col-span-6">
                <label class="pl-2 text-gray-500">Blog Post Type</label>
                <div class="flex items-center gap-2">
                    <InputSelect class="grow" :required="true" :disabled="data.loading" name="category"
                        placeholder="Select Post Type...">
                        <option value="">Select Post Type...</option>
                        <option value="NEWS">News</option>
                        <option value="GAMING">Gaming</option>
                    </InputSelect>
                </div>
                <VErrorMessage name="category" as="div" class="text-red-600" />
            </div>

            <div class="col-span-12 md:col-span-6">
                <label class="pl-2 text-gray-500">Blog Post Status</label>
                <div class="flex items-center gap-2">
                    <InputSelect class="grow" :required="true" :disabled="data.loading" name="status"
                        placeholder="Select Status Type...">
                        <option value="">Select Status Type...</option>
                        <option value="DRAFT">Draft</option>
                        <option value="PUBLISHED">Published</option>
                    </InputSelect>
                </div>
                <VErrorMessage name="status" as="div" class="text-red-600" />
            </div>

            <div class="col-span-12 text-center">
                <h2 class="text-2xl">Meta Description</h2>
                <div class="mx-2 md:mx-5 pt-2">
                    <div class="h-1 w-full rounded-20 mx-auto bg-light-50 dark:bg-dark-50"></div>
                </div>
            </div>


            <div class="col-span-12 md:col-span-8 grid grid-cols-12 gap-5 self-start">
                <div class="col-span-12">
                    <label class="pl-2 text-gray-500">Meta Title</label>
                    <Input class="mt-1" :required="true" :disabled="data.loading" name="metaTitle"
                        placeholder="title that shows on google" />
                </div>
                <div class="col-span-12">
                    <label class="pl-2 text-gray-500">Meta Description</label>
                    <InputTextarea name="metaDescription" />
                    <p class="text-sm text-gray-500 pl-3">
                        {{ values.metaDescription.length }} out of 160
                    </p>
                </div>
            </div>

            <div class="col-span-12 md:col-span-3">
                <label class="pl-2 text-gray-500">Service Image</label>
                <InputImage name="image" :required="true" :disabled="data.loading">
                    <label for="image">
                        <div class="relative mx-auto cursor-pointer">
                            <div
                                class="relative shadow-lg rounded-20 bg-zinc-800 h-64 max-item transform hover:cursor-pointer">
                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                    v-if="!values.image">
                                    <p>Add image</p>
                                </div>
                                <img v-else class="object-cover z-0 rounded-20 h-full w-full"
                                    :src="fileObjectToUrl(values.image)" />
                            </div>
                        </div>
                    </label>
                </InputImage>
            </div>

            <div class="col-span-12">
                <div>
                    <button type="submit" @click="submitDisplayName($event, values)"
                        :disabled="!formMeta.valid || data.loading"
                        class="text-white w-full disabled:bg-red-500/20 font-bold bg-red-500 hover:bg-red-500/75 p-3 rounded-20">
                        {{ props.post ? "Update Post" : "Create Post" }}
                    </button>
                </div>
            </div>
        </VForm>
    </div>
</template>

<script lang="ts" setup>
import { mixed, object, string } from "yup"
const props = defineProps({
    post: {
        type: Object,
        default: null,
    },
    id: {
        type: String,
        default: null,
    }
})
const router = useRouter()
const data = reactive({
    loading: false,
    errorMsg: "",
})
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const schema = object({
    metaTitle: string().required(),
    metaDescription: string().required().max(160),
    title: string().required().max(120),
    content: mixed().required(),
    category: string().required(),
    status: string().required(),
    image: mixed().nullable().required("A file is required"),
})
const initialValues = {
    metaTitle: props.post ? props.post.meta.title : '',
    metaDescription: props.post ? props.post.meta.description : '',
    title: props.post ? props.post.title : '',
    content: props.post ? JSON.parse(props.post.content) : '',
    category: props.post ? props.post.category : '',
    status: props.post ? props.post.status : '',
    image: props.post ? props.post.image : null,
}
async function submitDisplayName(e: Event, values: any) {
    e.preventDefault()
    const form = new FormData();
    if (!values.image.toString().includes('cloudinary')) {
        if (!SUPPORTED_FORMATS.some((item) => item === (values.image as File).type)) {
            data.errorMsg = "Invalid data type for image";
            return;
        }
        form.append("media_file_", values.image);
    } else {
        form.append("urlImage", values.image);
    }
    if (props.post) {
        form.append("id", props.post.slug);
    }
    form.append("title", values.title);
    form.append("category", values.category);
    form.append("status", values.status);
    form.append("content", JSON.stringify(values.content));
    form.append("metaTitle", values.metaTitle);
    form.append("metaDescription", values.metaDescription);
    data.loading = true
    data.errorMsg = ""
    await useFetchApi('/api/blog/create', {
        method: 'POST',
        body: form,
    }).then(() => {
        data.errorMsg = "Successfully created blog post"
        router.push('/admin/blogs')
    }).catch((err) => {
        data.errorMsg = err.message
    }).finally(() => {
        data.loading = false
    })
}
const fileObjectToUrl = (file: File) => {
    if (file.toString().includes('cloudinary')) {
        return file
    }
    return URL.createObjectURL(file);
};
</script>