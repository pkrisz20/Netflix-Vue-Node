<template>
    <div class="userinterface">
        <HeaderUser />
        <HeroUser />
        <AddMovieForm ref="modalUploadForm"/>
        
        <BlockTitle class="first" :title="'Top Series Now'" />
        <MovieCarousel />

        <BlockTitle class="left-side" :title="'Trending Now'" />
        <MovieCarousel />

        <BlockTitle class="left-side" :title="'Top Movies Now'" />
        <MovieCarousel />

        <BlockTitle class="left-side" :title="'New & Popular'" />
        <MovieCarousel />
        <!-- <Footer /> -->
    </div>
</template>

<script>
import BlockTitle from "../../components/global/BlockTitle.vue";
import HeaderUser from "../../components/user/HeaderUser.vue";
import HeroUser from "../../components/user/HeroUser.vue";
import AddMovieForm from "../../components/user/AddMovieForm.vue";
import MovieCarousel from "../../components/user/MoviesCarousel.vue";
// import Footer from "@/components/global/Footer.vue";

    export default {
        name: "LoggedInUser",
        components: {
            HeaderUser,
            HeroUser,
            AddMovieForm,
            MovieCarousel,
            BlockTitle,
            // Footer
        },
        // methods: {
        //     handleBackButton() {
        //         window.onpopstate = function() {
        //             alert('browser-back');
        //         };
        //     }
        // },
        // mounted() {
        //     // if back button is pressed
        //     window.onpopstate = function(event) {
        //         window.reload();
        //         console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
        //     };
        // }
        // beforeDestroy () {
        //     document.removeEventListener("backbutton", this.handleBackButton);
        // }
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
}
</style>