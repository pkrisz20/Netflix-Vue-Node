<template>
<div>
    <HeaderUser @openUploadForm="openModal"/>
    <AddMovieForm ref="modalUploadForm"/>
    <div class="bg-linear">
        <div class="container">
            <img class="cover-image" alt="background" src="../../assets/images/peaky.jpg">

            <div class="movie-details">
                <h1 class="movie-title">{{ movieTitle }}</h1>
                <div class="movie-info-box">

                    <div class="info"><i class="far fa-hourglass-half"></i> Duration: {{ movieDuration }}</div>

                    <div class="info"><i class="far fa-calendar-star"></i> Release: {{ releaseDate }}</div>

                    <div class="info"><i class="fas fa-film-alt"></i> Category: {{ movieType }}</div>
                </div>

                <p class="movie-desc">{{ movieDescription }}</p>

                <div class="btns">
                    <button class="btn watch"><i class="fas fa-play"></i> WATCH</button>
                    <button class="btn add"><i class="fas fa-plus"></i> WATCH LATER</button>
                    <button class="btns-favourite"><i class="fas fa-heart"></i></button>
                    <button class="btns_likes like">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.543 489.543" xml:space="preserve"><path d="M270.024 0c-22.6 0-15 48.3-15 48.3s-48.3 133.2-94.5 168.7c-9.9 10.4-16.1 21.9-20 31.3-.9 2.3-1.7 4.5-2.4 6.5-3.1 6.3-9.7 16-23.8 24.5l46.2 200.9s71.5 9.3 143.2 7.8c28.7 2.3 59.1 2.5 83.3-2.7 82.2-17.5 61.6-74.8 61.6-74.8 44.3-33.3 19.1-74.9 19.1-74.9 39.4-41.1.7-75.6.7-75.6s21.3-33.2-6.2-58.3c-34.3-31.4-127.4-10.5-127.4-10.5-6.5 1.1-13.4 2.5-20.8 4.3 0 0-32.2 15 0-82.7 32.3-97.7-21.4-112.8-44-112.8zM127.324 465.7l-35-166.3c-2-9.5-11.6-17.3-21.3-17.3h-66.8l-.1 200.8h109.1c9.8.1 16.1-7.7 14.1-17.2z"/></svg>
                        Like
                    </button>
                    <button class="btns_likes dislike">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xml:space="preserve"><path d="M117.333 10.667h-64C23.936 10.667 0 34.603 0 64v170.667C0 264.064 23.936 288 53.333 288H160c5.888 0 10.667-4.779 10.667-10.667V64c0-29.397-23.936-53.333-53.334-53.333zM512 208c0-18.496-10.603-34.731-26.347-42.667 3.285-6.549 5.013-13.781 5.013-21.333 0-18.496-10.603-34.752-26.368-42.688 4.864-9.728 6.293-20.928 3.84-32.043C463.36 47.68 443.051 32 419.819 32H224c-7.232 0-16.405 1.173-25.771 3.285-5.739 1.301-9.344 6.976-8.064 12.693C191.403 53.632 192 58.859 192 64v213.333c0 5.739-1.6 11.264-4.736 16.448a10.623 10.623 0 0 0-.555 9.984l47.957 103.893v72.32a10.75 10.75 0 0 0 3.989 8.341c.683.555 16.512 13.013 38.677 13.013 24.683 0 64-39.061 64-85.333 0-29.184-10.453-65.515-16.96-85.333h131.755c28.715 0 53.141-21.248 55.637-48.341 1.387-15.189-3.669-29.824-13.632-40.725C506.901 232.768 512 220.821 512 208z"/></svg>
                        Dislike
                    </button>
                </div>
            </div>
        </div>
        <Comments />
    </div>
</div>
</template>

<script>
import HeaderUser from "../../components/user/HeaderUser.vue";
import Comments from "../../components/user/Comments.vue";
import AddMovieForm from "../../components/user/AddMovieForm.vue";

    export default {
        name: "Moviedetails",
        components: {
            Comments,
            HeaderUser,
            AddMovieForm
        },
        data() {
            return {
                movieTitle: 'Peaky Blinders',
                movieDuration: '5 Season',
                releaseDate: 2016,
                movieType: 'Series',
                movieDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, exercitationem? Corrupti, possimus inventore! Atque nisi dolor explicabo nesciunt iusto omnis commodi quos, voluptate repellat quidem nostrum accusantium ex, corporis laudantium sunt fugit culpa beatae deleniti voluptatibus eaque libero molestiae! Vel fugit, officia eaque ullam sunt exercitationem magnam tempora mollitia voluptatum.',
            }
        },
        methods: {
            openModal() {
                this.$refs.modalUploadForm.openModal();
            }
        },
    }
</script>

<style lang="scss" scoped>
.bg-linear {
    position: relative;
    width: 100%;
    height: auto;

    &::after {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 100%;
        background: linear-gradient($c-black, $c-skyblue);
        opacity: 0.75;
    }

    .container {
        width: 100%;
        height: 100vh;
        position: relative;

        @media #{$r-max-tablet} {
            min-height: 100%;
        }

        .cover-image {
            width: 100%;
            height: 100vh;
            @include object-fit();
            mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);
        }

        .movie-details {
            width: 1170px;
            padding: 0 15px;
            margin: 0 auto;
            @include absoluteCenter();
            z-index: 6;

            @media #{$r-max-laptop-m} {
                width: calc(100% - 30px);
                padding-top: 50px;
            }

            @media #{$r-max-tablet} {
                padding-top: 70px;
            }

            @media #{$r-max-mobile-s} {
                padding-top: 160px;
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
                    font-size: 18px;
                    color: $c-white;
                    display: flex;
                    align-items: center;

                    @media #{$r-max-tablet} {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .info {
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

                        svg {
                            width: 40px;
                            height: 40px;
                            margin-bottom: -8px;
                            margin-right: 5px;
                            fill: $c-white;
                        }
                    }
                }

                &-desc {
                    color: $c-white;
                    font-size: 18px;
                    text-align: justify;

                    @media #{$r-max-tablet} {
                        margin: 5px 0;
                    }

                    @media #{$r-max-mobile-l} {
                        font-size: 15px;
                    }
                }
            }

            .btns {
                margin-left: 40px;
                display: flex;
                align-items: center;

                @media #{$r-max-laptop-s} {
                    margin-left: 0;
                }

                @media #{$r-max-tablet} {
                    display: grid;
                    grid-template-columns: repeat(3, auto);
                    row-gap: 10px;
                }

                @media #{$r-max-mobile-s} {
                    display: flex;
                    flex-direction: column;
                }

                .btn {
                    padding: 16px 24px;
                    color: $c-dark-theme;
                    margin: 0 20px;
                    font-size: 18px;
                    border-radius: 3px;
                    border: none;
                    cursor: pointer;
                    transition: .3s;

                    @media #{$r-max-laptop-s} {
                        margin: 0 10px;
                        font-size: 15px;
                    }

                    &.watch {
                        background: $c-green-theme;

                        &:hover {
                            background-color: $c-success;
                            color: $c-white;
                        }
                    }

                    &.add {
                        background: $c-white;

                        &:hover {
                            background-color: $c-b;
                        }
                    }
                }

                &-favourite {
                    border: none;
                    cursor: pointer;
                    transition: all .3s;
                    margin: 0 20px;
                    font-size: 35px;
                    background: none;
                    color: $c-white;

                    @media #{$r-max-laptop-s} {
                        margin: 0 10px;
                        font-size: 28px;
                    }

                    &:hover {
                        color: $c-red;
                        transform: scale(1.2);
                    }
                }

                &_likes {
                    display: flex;
                    align-items: center;
                    color: $c-white;
                    font-size: 24px;
                    font-family: $c-main-font;
                    border: none;
                    background-color: transparent;
                    margin: 0 15px;
                    cursor: pointer;
                    padding: 10px 20px;
                    border-radius: 3px;
                    transition: all .3s ease-in-out;

                    @media #{$r-max-laptop-s} {
                        margin: 0 10px;
                        font-size: 18px;
                    }

                    svg {
                        width: 26px;
                        height: 26px;
                        fill: $c-white;
                        margin-right: 5px;

                        @media #{$r-max-laptop-s} {
                            width: 22px;
                            height: 22px;
                        }
                    }

                    &:hover {
                        transform: scale(1.1);

                        &.like {
                            background-color: $c-blue;
                        }

                        &.dislike {
                            background-color: $c-error;
                        }
                    }
                }
            }
        }
    }
}
</style>