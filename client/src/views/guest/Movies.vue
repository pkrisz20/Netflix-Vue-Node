<template>
    <div class="movies">
        <LoadingScreen v-if="this.requestStatus != 200" />
        <Header />
        <BlockTitle :title=category />
        <div class="emptylist" v-if="this.notFound">Not found any movie like this in the database.</div>
        <MovieList :movies=this.moviesByCategory />
    </div>
</template>

<script>
import LoadingScreen from "@/components/global/LoadingScreen.vue";
import BlockTitle from "@/components/global/BlockTitle.vue";
import Header from "@/components/guest/Header.vue";
import MovieList from "@/components/global/MovieList.vue";
import Axios from "axios";

    export default {
        name: "MoviesGuest",
        data() {
            return {
                requestStatus: 0,
                moviesByCategory: [],
                notFound: false,
                categoryParam: this.$route.params.category,
            }
        },
        props: { category: String },
        components: {
            Header,
            LoadingScreen,
            MovieList,
            BlockTitle
        },
        created() {
            Axios.get(`http://localhost:3000/movies/getbycategory/${this.categoryParam}`)
            .then((response) => {
                if (!response.data.status) {
                    this.notFound = true;
                }

                else if (response.data.status) {
                    this.moviesByCategory = response.data.result;
                }
                this.requestStatus = 200;
            });
        }
    }
</script>

<style lang="scss" scoped>
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

.movies {
    background-color: $c-3;
    min-height: 100vh;

    .block_title {
        padding: 110px 15px 0;
    }

    .movies_section {
        background-color: $c-3;
    }
}
</style>