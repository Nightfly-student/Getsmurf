<template>
    <div class="grid grid-cols-12 space-y-5 justify-center">
        <VForm v-slot="{ values, meta: formMeta }" :initial-values="initialValues" :validation-schema="schema"
            class="col-span-12 grid grid-cols-12 items-center gap-5 justify-center">
            <div v-if="data.errorMsg" class="col-span-12">
                <div class="bg-light-50/20 p-2 py-3 text-center rounded-20">
                    <p>{{ data.errorMsg }}</p>
                </div>
            </div>

            <div class="col-span-6">
                <label class="pl-2 text-gray-500">Format</label>
                <div class="flex items-center gap-2">
                    <InputSelect class="grow" :required="true" :disabled="data.loading" name="format"
                        placeholder="Select Format...">
                        <option value="">Select Format...</option>
                        <option v-if="slug" value="USER:PASS">USER:PASS</option>
                        <option v-if="slug" value="USER:PASS:SKIN_SHARDS">USER:PASS:SKIN_SHARDS</option>
                        <option v-if="!slug" value="REGION:USER:PASS:BE">REGION:USER:PASS:BE</option>
                        <option v-if="!slug" value="REGION:USER:PASS:BE:SKIN_SHARDS">REGION:USER:PASS:BE:SKIN_SHARDS
                        </option>
                        <option v-if="!slug" value="REGION:USER:PASS:LEVEL:BE:OE:CHAMPIONS:SKIN_SHARDS">
                            REGION:USER:PASS:LEVEL:BE:OE:CHAMPIONS:SKIN_SHARDS
                        </option>
                    </InputSelect>
                </div>
                <VErrorMessage name="game" as="div" class="text-red-600" />
            </div>

            <div class="col-span-12">
                <label class="pl-2 text-gray-500">Accounts</label>
                <InputTextarea name="accounts" :placeholder="values.format"></InputTextarea>
                <p v-if="values.accounts && values.accounts.split(/\r\n|\r|\n/).length > 1" class="pl-4 pt-2 text-sm">
                    Accounts Count: {{
                        values.accounts.split(/\r\n|\r|\n/).length - 1
                    }}</p>
            </div>

            <div class="col-span-6">
                <label class="pl-2 text-gray-500">Supplier</label>
                <Input class="mt-1" :required="true" :disabled="data.loading" name="supplierName"
                    placeholder="Supplier Name" />
            </div>
            <div class="col-span-6">
                <label class="pl-2 text-gray-500">Source</label>
                <Input class="mt-1" :required="true" :disabled="data.loading" name="supplierSource"
                    placeholder="Supplier Source" />
            </div>

            <div class="col-span-12">
                <div>
                    <button type="submit" @click="submitLogin($event, values)" :disabled="!formMeta.valid || data.loading"
                        class="text-white w-full disabled:bg-red-500/20 font-bold bg-red-500 hover:bg-red-500/75 p-3 rounded-20">
                        <IconsSpinner class="w-5 h-5" :loading="data.loading" />
                        Add Accounts
                    </button>
                </div>
            </div>
        </VForm>
    </div>
</template>

<script lang="ts" setup>
import { e } from "ofetch/dist/error-8a55452d";
import { object, string } from "yup";
const data = reactive({
    loading: false,
    errorMsg: "",
});

const props = defineProps({
    slug: {
        type: String,
        default: null
    }
})

const route = useRoute();
const router = useRouter();

const schema = object({
    format: string().required().label("Format"),
    accounts: string().required().label("Accounts"),
    supplierName: string().required().label("Supplier"),
    supplierSource: string().required().label("Source"),
});
const initialValues = { format: "", accounts: "", supplierName: "", supplierSource: "" };



async function submitLogin(e: Event, values: any) {
    e.preventDefault();
    data.loading = true;
    data.errorMsg = "";

    const accountsJsonArray = formatAccountsToJsonArray(values.accounts, values.format);

    const info = {
        supplier: {
            name: values.supplierName,
            source: values.supplierSource,
        },
        accounts: accountsJsonArray,
    }


    // Make a promise all for each account
    await Promise.all(
        accountsJsonArray.map(async (account: any) => {
            await useFetchApi('/api/accounts/admin', {
                method: 'POST',
                body: {
                    accounts: [
                        account
                    ],
                    supplier: info.supplier,
                }
            }).catch(() => {
                data.errorMsg = `Error Adding Account: ${account.user}`;
            })
        })
    ).then((res) => {
        if (data.errorMsg) return;
        alert(`${res.length} Accounts Added!`)
    }).finally(() => {
        data.loading = false;
    })


    // await useFetchApi('/api/accounts/admin', {
    //     method: 'POST',
    //     body: {
    //         supplier: info.supplier,
    //         accounts: info.accounts,
    //     }
    // }).then((res) => {
    //     alert(`${res} Accounts Added!`)
    // }).catch((err) => {
    //     data.errorMsg = err;
    // }).finally(() => {
    //     data.loading = false;
    // })
}

const formatAccountsToJsonArray = (accounts: string, format: string) => {
    const accountsArray = accounts.split(/\r\n|\r|\n/);
    const accountsJsonArray = [];

    for (let i = 0; i < accountsArray.length; i++) {
        const account = accountsArray[i];
        const accountJson: any = {};

        const accountArray = account.split(':');

        if (account === '') {
            return accountsJsonArray;
        }

        if (format.includes('REGION:USER:PASS:LEVEL:BE:OE:CHAMPIONS:SKIN_SHARDS')) {
            accountJson['region'] = accountArray[0].toUpperCase();
            accountJson['user'] = accountArray[1];
            accountJson['pass'] = accountArray[2];
            accountJson['be'] = parseInt(accountArray[4]);
            accountJson['beSlug'] = parseInt(accountArray[4].substring(0, 1)) + '0';

            if (accountArray[7] !== undefined && accountArray[7] !== '0') {
                const skins = accountArray[7].split('_');

                const formatted = skins.map((skin) => skin.replace(/ *\([^)]*\) */g, ""))
                accountJson['skins'] = [
                    ...formatted.map((skin) => {
                        return {
                            skinName: skin,
                        }
                    })
                ]
            }
            accountJson['slug'] = props.slug ? `${props.slug}` : `${accountJson['region'].toLowerCase()}${accountJson['beSlug']}k`

            accountsJsonArray.push(accountJson);
        } else {
            if (format.includes('REGION')) {
                accountJson['region'] = accountArray[0].toUpperCase();
            }

            if (format.includes('USER')) {
                if (format.includes('REGION:USER')) {
                    accountJson['user'] = accountArray[1];
                } else {
                    accountJson['user'] = accountArray[0];
                }
            }

            if (format.includes('PASS')) {
                if (format.includes('REGION:USER')) {
                    accountJson['pass'] = accountArray[2];
                } else {
                    accountJson['pass'] = accountArray[1];
                }
            }

            if (format.includes('BE')) {
                if (format.includes('REGION:USER')) {
                    accountJson['be'] = parseInt(accountArray[3]);
                    accountJson['beSlug'] = parseInt(accountArray[3].substring(0, 1)) + '0';
                } else {
                    accountJson['be'] = parseInt(accountArray[2]);
                    accountJson['beSlug'] = parseInt(accountArray[2].substring(0, 1)) + '0';
                }
            } else {
                accountJson['be'] = 0;
            }

            if (format.includes('SKIN_SHARDS')) {
                if (format.includes('REGION:USER')) {
                    if (accountArray[4] !== undefined) {
                        const skins = accountArray[4].split('_');

                        const formatted = skins.map((skin) => skin.replace(/ *\([^)]*\) */g, ""))
                        accountJson['skins'] = [
                            ...formatted.map((skin) => {
                                return {
                                    skinName: skin,
                                }
                            })
                        ]
                    }
                } else {
                    if (accountArray[2] !== undefined) {
                        const skins = accountArray[2].split('_');

                        const formatted = skins.map((skin) => skin.replace(/ *\([^)]*\) */g, ""))
                        accountJson['skins'] = [
                            ...formatted.map((skin) => {
                                return {
                                    skinName: skin,
                                }
                            })
                        ]
                    }
                }
            }

            accountJson['slug'] = props.slug ? `${props.slug}` : `${accountJson['region']}${accountJson['beSlug']}`

            accountsJsonArray.push(accountJson);
        }
    }

    return accountsJsonArray;
}

</script>