<template>
    <div class="new_and_popular">
        <HeaderUser />
        <BlockTitle :title="'New & Popular'" />

        <div class="wrapper">
            <Filters />
        </div>
        <MovieList />
    </div>
</template>

<script>
import BlockTitle from "../../components/global/BlockTitle.vue";
import HeaderUser from "../../components/user/HeaderUser.vue";
import Filters from "../../components/user/Filters.vue";
import MovieList from "../../components/global/MovieList.vue";

    export default {
        name: "NewAndPopular",
        components: {
            HeaderUser,
            Filters,
            MovieList,
            BlockTitle
        },
    }
</script>

<style lang="scss" scoped>
.new_and_popular {
    background-color: $c-3;
}
</style>