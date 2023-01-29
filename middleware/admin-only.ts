export default defineNuxtRouteMiddleware(async (to, from) => {
    const { useAuthUser } = useAuth();
    const user = useAuthUser();

    if (process.server) {
        console.log('ran serverside')
    }

    if (!user.value) {
        if (process.server) {
            return navigateTo({ path: "/login" });
        }

        return abortNavigation();
    }

    if (user.value.role !== "ADMIN") {
        if (process.server) {
            return navigateTo({ path: "/" });
        }

        return abortNavigation();
    }

    return;
});