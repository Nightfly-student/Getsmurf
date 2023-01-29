<template>
    <div class="grid grid-cols-12 space-y-5 justify-center pb-10">
        <VForm v-slot="{ values, meta: formMeta }" :initial-values="initialValues" :validation-schema="schema"
            class="col-span-12 grid grid-cols-12 gap-5 pt-10 justify-center items-center">
            <div v-if="data.errorMsg" class="col-span-12">
                <div class="bg-light-50/20 p-2 py-3 text-center rounded-20">
                    <p>{{ data.errorMsg }}</p>
                </div>
            </div>

            <div class="col-span-12">
                <label class="pl-2 text-gray-500">Title</label>
                <Input class="mt-1" :required="true" :disabled="data.loading" name="title"
                    placeholder="title that shows on google" />
            </div>

            <div class="col-span-12 md:col-span-9 grid grid-cols-12 gap-5 self-start">
                <div class="col-span-12">
                    <label class="pl-2 text-gray-500">Slug</label>
                    <Input class="mt-1" :required="true" :disabled="data.loading" name="slug"
                        placeholder="slug - url" />
                </div>
                <div class="col-span-12">
                    <label class="pl-2 text-gray-500">Description</label>
                    <InputQuill name="description" />
                </div>
            </div>

            <div class="col-span-12 md:col-span-3">
                <label class="pl-2 text-gray-500">Service Image</label>
                <InputImage name="image" :required="true" :disabled="data.loading">
                    <label for="image">
                        <div class="relative mx-auto cursor-pointer">
                            <div
                                class="relative shadow-lg rounded-20 bg-zinc-800 h-96 max-item transform hover:cursor-pointer">
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

            <div class="col-span-12 gap-5 grid grid-cols-12 items-center">
                <div class="col-span-4">
                    <label class="pl-2 text-gray-500">Price</label>
                    <Input class="mt-1" :required="true" type="number" :disabled="data.loading" name="price"
                        placeholder="price" />
                </div>

                <div class="col-span-4">
                    <label class="pl-2 text-gray-500">Category</label>
                    <Input class="mt-1" :required="true" :disabled="data.loading" name="category"
                        placeholder="category" />
                </div>

                <div class="col-span-4">
                    <label class="pl-2 text-gray-500">Region</label>
                    <div class="flex items-center gap-2">
                        <InputSelect class="grow" :required="true" :disabled="data.loading" name="region"
                            placeholder="Select Region...">
                            <option value="">Select Region...</option>
                            <option value="EUW">EUW</option>
                            <option value="EUNE">EUNE</option>
                            <option value="NA">NA</option>
                            <option value="OCE">OCE</option>
                            <option value="LAN">LAN</option>
                            <option value="LAS">LAS</option>
                            <option value="TR">TR</option>
                            <option value="RU">RU</option>
                            <option value="BR">BR</option>
                        </InputSelect>
                    </div>
                    <VErrorMessage name="game" as="div" class="text-red-600" />
                </div>
            </div>

            <div class="col-span-12">
                <label class="pl-2 text-gray-500">Unique Identifier</label>
                <Input class="mt-1" :required="true" :disabled="data.loading" name="identifier"
                    placeholder="unique identifier is region:be" />
            </div>


            <div class="col-span-12">
                <div>
                    <button type="submit" @click="createNewService($event, values)"
                        :disabled="!formMeta.valid || data.loading"
                        class="text-white w-full disabled:bg-red-500/20 font-bold bg-red-500 hover:bg-red-500/75 p-3 rounded-20">
                        <IconsSpinner class="w-5 h-5" :loading="data.loading" />
                        Create new Service!
                    </button>
                </div>
            </div>
        </VForm>
    </div>
</template>

<script lang="ts" setup>
import { object, string, mixed, number } from "yup";

const router = useRouter();

const data = reactive({
    loading: false,
    errorMsg: "",
});

const schema = object({
    title: string().required("Title is required"),
    description: mixed().nullable(),
    image: mixed().required("Image is required"),
    slug: string().required("Slug is required"),
    price: number().min(1).max(100000).required("Price is required"),
    category: string().required("Category is required"),
    region: string().required("Region is required"),
    identifier: string().required("Identifier is required")
});

const initialValues = {
    title: "",
    description: "",
    image: null,
    slug: "",
    price: 0,
    category: "",
    region: "",
    identifier: "",
};

const createNewService = async (e: Event, values: any) => {
    e.preventDefault();
    data.loading = true;
    data.errorMsg = "";

    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", JSON.stringify(values.description));
    formData.append("media_file", values.image);
    formData.append("slug", values.slug);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("region", values.region);
    formData.append("identifier", values.identifier);

    await useFetchApi('/api/products/new', {
        method: 'POST',
        body: formData
    }).then(() => {
        data.loading = false;
        router.push('/admin/products');
    }).catch((err) => {
        data.loading = false;
        data.errorMsg = err.message;
    })
};

const fileObjectToUrl = (file: any) => {
    if (file) {
        return URL.createObjectURL(file);
    }
    return "";
};
</script>
