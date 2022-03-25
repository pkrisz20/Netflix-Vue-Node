<template>
<div>
    <Header />
    <div class="bg-linear">
        <div class="container" v-for="item in getMovieDetails" :key="item.id">
            <img class="cover-image" alt="background" :src="'data:image.*;base64,' + item.image">

            <div class="movie-details">
                <h1 class="movie-title">{{ item.movieName }}</h1>
                <div class="movie-info-box">

                    <!-- <div class="info"><i class="far fa-hourglass-half"></i> Duration: {{ item.movieDuration }}</div> -->

                    <div class="info"><i class="far fa-calendar-star"></i> Release: {{ item.releaseDate }}</div>

                    <!-- <div class="info"><i class="fas fa-film-alt"></i> Category: {{ item.movieType }}</div> -->
                </div>

                <p class="movie-desc">{{ item.movieDescription }}</p>
            </div>
        </div>
        <Comments />
    </div>
</div>
</template>

<script>
import Header from "@/components/guest/Header.vue";
import Comments from "@/components/guest/Comments.vue";

    export default {
        name: "Moviedetails",
        components: {
            Comments,
            Header
        },
        data() {
            return {
                movieId: this.$route.params.movieId,
            }
        },
        computed: {
            getMovieDetails() {
                return this.$store.state.movieDetails;
            }
        },
        created() {
            this.$store.dispatch("getMovieDetails", this.movieId);
        },
    }
</script>

<style lang="scss" scoped>
.bg-linear {
    position: relative;
    width: 100%;
    height: auto;
    background-color: $c-dark-theme;

    .container {
        width: 100%;
        height: 100vh;
        position: relative;
        mask-image: linear-gradient(to bottom, rgba($c-dark-theme, 1) 60%, rgba($c-black, 0) 100%);

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            content: '';
            width: 100%;
            height: 100%;
            background-color: $c-black;
            opacity: 0.7;
        }

        .cover-image {
            width: 100%;
            height: 100vh;
            @include object-fit();
            
        }

        .movie-details {
            width: 1170px;
            padding: 0 15px;
            margin: 0 auto;
            @include absoluteCenter();
            z-index: 4;

            @media #{$r-max-laptop-m} {
                width: calc(100% - 30px);
            }

            .movie {
                &-title {
                    color: $c-white;
                    font-size: 40px;
                    letter-spacing: 4px;

                    @media #{$r-max-laptop-s} {
                        text-align: center;
                    }

                    @media #{$r-max-mobile-l} {
                        font-size: 32px;
                    }

                    @media #{$r-max-mobile-s} {
                        letter-spacing: 2px;
                        font-size: 26px;
                        margin: 5px 0;
                    }
                }

                &-info-box {
                    display: flex;
                    align-items: center;

                    @media #{$r-max-tablet} {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .info {
                        color: $c-white;
                        margin: 0 30px;
                        font-weight: 700;
                        font-size: 24px;
                        
                        @media #{$r-max-laptop-s} {
                            margin: 0 25px;
                        }

                        @media #{$r-max-tablet} {
                            margin: 10px 0;
                        }

                        @media #{$r-max-mobile-l} {
                            font-size: 20px;
                        }

                        @media #{$r-max-mobile-s} {
                            font-size: 18px;
                            margin: 5px 0;
                        }
                    }
                }

                &-desc {
                    color: $c-white;
                    font-size: 18px;
                    text-align: justify;

                    @media #{$r-max-mobile-l} {
                        font-size: 15px;
                    }
                }
            }
        }
    }
}
</style>