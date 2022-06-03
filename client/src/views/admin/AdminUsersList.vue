<template>
    <div class="users_view">
        <LoadingScreen v-if="httpStatusCode == 0" />
        <HeaderAdmin />
        <div class="page-wrapper">
            <AdminSearchBar :searchTpye="'users'" />
        </div>
    </div>
</template>

<script>
import LoadingScreen from "@/components/global/LoadingScreen.vue";
import HeaderAdmin from "@/components/admin/HeaderAdmin.vue";
import AdminSearchBar from "@/components/admin/AdminSearchBar.vue";
// import { mapState, mapGetters } from "vuex";

    export default {
        name: "AdminUserList",
        components: {
            LoadingScreen,
            HeaderAdmin,
            AdminSearchBar
        },
    }
</script>

<style lang="scss">
.users_view {
    min-height: 100vh;
    background-color: $c-3;

    .wrapper {
        padding: 60px 0 0;
    }
}
</style>