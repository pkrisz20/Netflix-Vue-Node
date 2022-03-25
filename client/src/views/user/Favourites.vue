<template>
    <div class="favourites">
        <HeaderUser @openUploadForm="openModal"/>
        <AddMovieForm ref="modalUploadForm"/>
        <BlockTitle :title="'Your Favourites'" />
        
        <div class="favourites-container">
            <div class="wrapper">
                <Filters />
            </div>
            <!-- <h2 class="favourites-title">Your Favourites</h2> -->
            <!-- <div style="color: #fff;" v-for="(item, i) in $store.state.list" :key="i">
                {{ item.movieReview }}
            </div> -->
            <MovieList />
        </div>
    </div>
</template>

<script>
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
        BlockTitle
    },
    methods: {
        openModal() {
            this.$refs.modalUploadForm.openModal();
        }
    },
    mounted() {
        this.$store.dispatch('getAllMovies');
    }
}
</script>

<style lang="scss">
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