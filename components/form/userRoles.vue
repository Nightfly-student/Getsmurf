<template>
    <div class="grid grid-cols-12 space-y-5 justify-center">
        <VForm v-slot="{ values, meta: formMeta }" class="col-span-12 grid grid-cols-12 space-y-5 justify-center">
            <div v-if="data.errorMsg" class="col-span-12">
                <div class="bg-light-50/20 p-2 py-3 text-center rounded-20">
                    <p>{{ data.errorMsg }}</p>
                </div>
            </div>

            <div class="col-span-12">
                <label class="pl-2 text-gray-500">Roles</label>
                <InputMultiselect :selectedItems="rolesList" class="mt-1" :api="`/api/users/roles`" :required="true"
                    :disabled="data.loading" name="roles" placeholder="your roles" @update="onUpdate" @remove="onRemove" />
            </div>
        </VForm>
    </div>
</template>

<script lang="ts" setup>
const data = reactive({
    loading: false,
    errorMsg: "",
});

const emits = defineEmits(['update', 'remove']);

const props = defineProps<{
    user: any;
}>();

const rolesList: any = ref([]);

const roles = props.user.roles;
roles.forEach((role: any) => {
    rolesList.value.push({ name: role.roleName, email: props.user.email });
});

const onUpdate = async (value: any) => {
    await useFetchApi('/api/users/roles',
        {
            method: 'PUT',
            body: { role: value.id, email: props.user.email }
        })

    rolesList.value.push({ name: value.id, email: props.user.email });
    emits('update', rolesList.value)
};

const onRemove = async (value: any) => {
    await useFetchApi('/api/users/roles', {
        method: 'DELETE',
        body: { role: value.id, email: props.user.email }
    })
    rolesList.value = rolesList.value.filter((item: any) => item.name !== value.id);
    emits('remove', rolesList.value)
};

watch(() => props.user, (newVal: any) => {
    rolesList.value = [];
    newVal.roles.forEach((role: any) => {
        rolesList.value.push({ name: role.roleName, email: props.user.email });
    });
});
</script>