<template>
    <div class="movies">
        <Header />
        <BlockTitle :title=category />
        <MovieList />
    </div>
</template>

<script>
import BlockTitle from "@/components/global/BlockTitle.vue";
import Header from "@/components/guest/Header.vue";
import MovieList from "@/components/global/MovieList.vue";

    export default {
        name: "Movies",
        components: {
            Header,
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