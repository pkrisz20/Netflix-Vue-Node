<template>
<div>
    <HeaderUser @openUploadForm="openModal" @logoutUser="logOut"/>
    <HeroUser />
    <AddMovieForm ref="modalUploadForm"/>
    <h1 class="carousel-title first">Top Series Now</h1>
    <MovieCarousel />
    <h1 class="carousel-title">Trending Now</h1>
    <MovieCarousel />
    <h1 class="carousel-title">New & Popular</h1>
    <MovieCarousel />
</div>
</template>

<script>
import HeaderUser from "../../components/user/HeaderUser.vue";
import HeroUser from "../../components/user/HeroUser.vue";
import AddMovieForm from "../../components/user/AddMovieForm.vue";
import MovieCarousel from "../../components/MoviesCarousel.vue";
import Axios from 'axios';

    export default {
        name: "LoggedInUser",
        components: {
            HeaderUser,
            HeroUser,
            AddMovieForm,
            MovieCarousel
        },
        methods: {
            openModal() {
                this.$refs.modalUploadForm.openModal();
            },

            logOut() {
                Axios.get("http://localhost:3000/logout");
            }
        }
    }
</script>

<style lang="scss" scoped>
.carousel-title {
    color: $c-e;
    margin: 50px 15px 10px;

    &.first {
        margin: -60px 15px 10px;
    }
}
</style>