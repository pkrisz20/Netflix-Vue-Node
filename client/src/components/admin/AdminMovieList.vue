<template>
    <div class="movies_list">
        <div class="modal-vue" v-if="this.showModal">
            <div class="overlay" @click="openModal()"></div>
            <div class="modal">
                <h3 class="">Are you sure you want to delete this movie?</h3>
                <div class="operations">
                    <button @click="deleteMovie()" class="operations_btn delete">DELETE</button>
                    <button @click="openModal()" class="operations_btn cancel">CANCEL</button>
                </div>
            </div>
        </div>

        <div class="movies_section">
            <div class="error" v-if="message">{{ message }}</div>
            
            <div class="wrapper">
                <div class="listCards">

                    <div class="card" v-for="item in movies" :key="item.id">
                        <div class="card_stickers">

                            <div class="info" @click="routeToAdmin(item.id)">
                                <i class="fas fa-info-circle"></i>
                            </div>
                            <div class="info" @click="openModal(item.id)">
                                <i class="fas fa-trash-alt"></i>
                            </div>
                            <div class="info" @click="handleUpdateForm(item.id)">
                                <i class="fas fa-edit"></i>
                            </div>
                        </div>

                        <div class="card_image">
                            <img class="thumbnail" alt="moviepicture" :src="getImagePath(item.image)">
                        </div>
                        <h2 class="card_title">{{ item.movieName }}</h2>
                        <h4 class="card_realease">{{ item.releaseDate }}</h4>

                        <div class="card_bottom">
                            <div class="card_bottom-comments"><i class="fas fa-comment-alt-dots"></i>{{ comments(item.id) }}</div>
                            <div class="card_bottom-likes"><i class="fas fa-thumbs-up"></i> {{ likes(item.id) }}</div>
                            <div class="card_bottom-dislikes"><i class="fas fa-thumbs-down"></i> {{ dislikes(item.id) }}</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    name: "AdminMovieList",
    props: {
        movies: Array
    },
    data() {
        return {
            message: "",
            showModal: false,
            movieIdDelete: null
        }
    },
    computed: {
        ...mapState({
            adminStatus: state => state.adminLoggedIn,
        }),
        ...mapGetters({
            comments: 'getCommentsForList',
            dislikes: 'getDislikesCount',
            likes: 'getLikesCount'
        }),
    },
    methods: {
        openModal(item) {
            this.showModal = !this.showModal;

            if (this.showModal) {
                this.movieIdDelete = item;
            }
        },
        handleUpdateForm(ID) {
            this.$store.state.movieToUpdate = ID;
            this.$emit('openUpdateForm');
        },
        deleteMovie() {
            this.$store.dispatch("deleteMovie", this.movieIdDelete);
        },
        getImagePath (image) {
            return require('../../../../server/uploads/movies/' + image);
        },
        routeToAdmin(movieId) {
            if (this.adminStatus) {
                this.$router.push({ path: `/detailsadmin/${movieId}` });
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.error {
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

.modal-vue {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @include flexCenter();

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 998;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
    }

    .modal {
        position: relative;
        width: 300px;
        z-index: 1000;
        padding: 20px 30px;
        background-color: $c-white;
        text-align: center;

        .operations {
            display: flex;
            justify-content: center;

            &_btn {
                cursor: pointer;
                padding: 12px 18px;
                border: none;
                border-radius: 5px;
                margin: 0 10px;
                color: $c-white;
                font-weight: 700;
                font-family: $c-main-font;

                &.delete {
                    background-color: $c-red;
                }

                &.cancel {
                    background-color: $c-blue;
                }
            }
        }
    }
}

.movies_section {
    padding: 10px 0 50px;
    background-color: $c-6;

    .wrapper {
        @media #{$r-max-laptop-m} {
            width: calc(100% - 30px);
        }

        @media #{$r-max-mobile-l} {
            @include flexCenter();
        }

        @media #{$r-max-mobile-s} {
            padding: 0 30px;
            width: calc(100% - 60px);
        }
    }
}

.listCards {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 15px;
    column-gap: 15px;
    margin-top: 30px;

    @media #{$r-max-laptop-s} {
        grid-template-columns: repeat(2, 1fr);
        max-width: 750px;
        margin: 0 auto;
    }

    @media #{$r-max-mobile-l} {
        @include flexCenter();
        flex-direction: column;
        width: 75%;
        row-gap: 30px;
    }

    @media #{$r-max-mobile-s} {
        width: 100%;
    }

    .card {
        border: none;
        border-radius: 3px;
        background: $c-c;
        @include flexCenter();
        flex-direction: column;
        cursor: pointer;
        overflow: hidden;
        transition: .3s;
        position: relative;

        &_stickers {
            z-index: 4;
            position: absolute;
            right: -43px;
            top: 10px;
            background-color: $c-green-theme;
            transition: right .3s ease;

            .info {
                padding: 10px;
                transition: all .3s ease-in-out;

                i {
                    font-size: 20px;
                    color: $c-white;
                }

                &:hover {
                    background-color: $c-dark-theme;
                }
            }
        }

        &_image {
            transition: .3s;
            width: 100%;
            height: 100%;

            img {
                @include object-fit();
                width: 100%;
                height: 100%;
            }
        }

        &_title {
            transition: .3s;
            font-size: 28px;
            color: $c-3;
            text-align: center;
            margin: 15px 0 10px;

            @media #{$r-max-tablet} {
                font-size: 22px;
            }
        }

        &_realease {
            transition: .3s;
            color: $c-3;
            text-align: center;
            margin: 5px 0;
            font-weight: 600;
            font-size: 20px;

            @media #{$r-max-tablet} {
                font-size: 18px;
            }
        }

        &_bottom {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            margin: 10px 0;
            color: $c-3;
            transition: .3s;

            &-comments, &-likes, &-dislikes {
                font-weight: 600;
                font-size: 18px;
                margin: 0 10px;
                display: flex;
                align-items: center;

                @media #{$r-max-tablet} {
                    font-size: 14px;
                }

                i {
                    margin-right: 3px;
                    font-size: 16px;

                    @media #{$r-max-tablet} {
                        font-size: 12px;
                    }
                }
            }
        }

        &:hover {
            background-color: $c-green-theme;

            .card_image {
                transform: scale(1.1);
            }

            .card_stickers {
                right: 0;
            }

            .card_title, .card_realease, .card_bottom {
                color: $c-white;
            }
        }

        .icons {
            width: 100%;
            display: flex;
            justify-content: center;

            .update-btn {
                background: transparent;
                border: none;
                font-size: 30px;
                cursor: pointer;
                transition: .4s;
                color: $c-3;

                &:hover {
                    transform: scale(1.2);
                }
            }

            .delete-btn {
                background: transparent;
                border: none;
                font-size: 30px;
                cursor: pointer;
                transition: .4s;
                color: $c-error;

                &:hover {
                    transform: scale(1.2);
                }
            }
        }
    }
}
</style>