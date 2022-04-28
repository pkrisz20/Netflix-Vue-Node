<template>
    <div class="favourites">
        <LoadingScreen v-if="httpStatusCode == 0"/>
        <HeaderUser @openUploadForm="openModal"/>
        <AddMovieForm ref="modalUploadForm"/>
        <BlockTitle :title="'My Favourites'" />
        
        <div class="favourites-container">
            <div class="wrapper">
                <Filters v-if="$store.getters.getFavourites != 0" />
            </div>
            <div class="emptylist" v-if="$store.getters.getFavourites == 0">You haven't added any movie to your favourites list yet.</div>
            <MovieList :movies=$store.getters.getFavourites />
        </div>
    </div>
</template>

<script>
import LoadingScreen from "@/components/global/LoadingScreen.vue";
import BlockTitle from "@/components/global/BlockTitle.vue";
import HeaderUser from '@/components/user/HeaderUser.vue';
import MovieList from '@/components/global/MovieList.vue';
import AddMovieForm from '@/components/user/AddMovieForm.vue';
import Filters from "@/components/user/Filters.vue";

export default {
    name: "Favourites",
    components: {
        HeaderUser,
        MovieList,
        AddMovieForm,
        Filters,
        LoadingScreen,
        BlockTitle
    },
    computed: {
        httpStatusCode() {
            return this.$store.state.httpStatus;
        }
    },
    methods: {
        openModal() {
            this.$refs.modalUploadForm.openModal();
        }
    },
    mounted() {
        this.$store.dispatch("getAllMovies");
        this.$store.dispatch("getLikes");
        this.$store.dispatch("getEachComment");
        this.$store.dispatch("getFavourites");
    }
}
</script>

<style lang="scss">
.emptylist {
    width: auto;
    padding: 20px;
    font-size: 20px;
    color: $c-white;
    background: $c-error;
    border-radius: 10px;
    border: 6px solid #b10101;
    z-index: 10;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @include flexCenter();
    pointer-events: none;
}

.favourites {
    background-color: $c-3;
    min-height: 100vh;

    &-container {
        padding-top: 20px;
        text-align: center;

        .wrapper {
            @media #{$r-max-laptop-m} {
                width: calc(100% - 30px);
            }
        }
    }

    &-title {
        color: $c-white;
        margin: 30px 0 60px;
        font-size: 30px;
        text-decoration: underline;
        text-underline-offset: 5px;
    }

    .movies_section {
        background-color: $c-3;
    }
}
</style>