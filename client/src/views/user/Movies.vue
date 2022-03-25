<template>
    <div class="movies">
        <HeaderUser />
        <BlockTitle :title=category />
        
        <div class="wrapper">
            <Filters />
        </div>
    <MovieList />
    </div>
</template>

<script>
import BlockTitle from "@/components/global/BlockTitle.vue";
import HeaderUser from "@/components/user/HeaderUser.vue";
import Filters from "@/components/user/Filters.vue";
import MovieList from "@/components/global/MovieList.vue";

    export default {
        name: "Movies",
        components: {
            HeaderUser,
            Filters,
            MovieList,
            BlockTitle
        },
        props: { category: String }
    }
</script>

<style lang="scss" scoped>
.movies {
    background-color: $c-3;

    .movies_section {
        background-color: $c-3;
    }
}
</style>