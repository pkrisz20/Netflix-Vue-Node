<template>
    <div class="userinterface">
        <LoadingScreen v-if="httpStatusCode == 0" />
        <HeaderUser />
        <HeroUser />
        
        <BlockTitle class="first" :title="'Top Series Now'" />
        <MovieCarousel />

        <BlockTitle class="left-side" :title="'Trending Now'" />
        <MovieCarousel />

        <BlockTitle class="left-side" :title="'Top Movies Now'" />
        <MovieCarousel />

        <div class="wrapper">
            <BlockTitle :title="'Each category'" />
            <Filters />
        </div>

        <MovieList :movies=$store.state.list />
        <!-- <Footer /> -->
    </div>
</template>

<script>
import LoadingScreen from "@/components/global/LoadingScreen.vue";
import BlockTitle from "@/components/global/BlockTitle.vue";
import HeaderUser from "@/components/user/HeaderUser.vue";
import HeroUser from "@/components/user/HeroUser.vue";
import MovieCarousel from "@/components/user/MoviesCarousel.vue";
import MovieList from "@/components/global/MovieList.vue";
import Filters from "@/components/user/Filters.vue";
// import Footer from "@/components/global/Footer.vue";

    export default {
        name: "Userinterface",
        components: {
            HeaderUser,
            HeroUser,
            MovieCarousel,
            BlockTitle,
            LoadingScreen,
            MovieList,
            Filters
            // Footer
        },
        computed: {
            httpStatusCode() {
                return this.$store.state.httpStatus;
            }
        },
        mounted() {
            this.$store.dispatch('getAllMovies');
            this.$store.dispatch("getLoginStatus");
            this.$store.dispatch("getEachComment");
            this.$store.dispatch('getLikes');
            this.$store.dispatch('getFavourites');
        }
    }
</script>

<style lang="scss" scoped>
.userinterface {
    background-color: $c-dark-theme;
    position: relative;
    z-index: 6;

    .first {
        justify-content: flex-start;
        padding: 0 15px 0;
        margin: -160px 0 40px;

        @media #{$r-max-tablet} {
            justify-content: center;
        }
    }

    .left-side {
        padding: 50px 15px 0;
        justify-content: flex-start;

        @media #{$r-max-tablet} {
            justify-content: center;
        }
    }

    .wrapper {
        .searchDetailes {
            margin-top: 60px;
        }
    }
}
</style>