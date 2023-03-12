export default defineNuxtRouteMiddleware(async (to, from) => {
    const { useAuthUser } = useAuth();
    const user = useAuthUser();



    if (!user.value) {
        if (process.server) {
            return navigateTo({ path: "/login" });
        }

        return abortNavigation();
    }

    if (!user.value.roles.some((role) => role.roleName === "AFFILIATE")) {
        if (process.server) {
            return navigateTo({ path: "/" });
        }

        return abortNavigation();
    }

    if (user.value.affiliate === null && to.path !== "/affiliate/new") {
        return navigateTo({ path: "/affiliate/new" });
    }

    return;
});