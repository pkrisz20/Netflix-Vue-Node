<template>
    <div class="movies_section">
        <div class="success" v-if="SuccesMessage">{{ SuccesMessage }} <i @click="closeMessage" class="fas fa-times"></i></div>
        <div class="error" v-if="errorMessage">{{ errorMessage }} <i @click="closeMessage" class="fas fa-times"></i></div>
        
        <div class="wrapper">
            <div class="listCards">

                <div class="card" v-for="item in movies" :key="item.id">
                    <div class="card_stickers">

                        <div class="info" @click="routeToDetails(item.id)">
                            <i class="fas fa-info-circle"></i>
                        </div>
                        <div class="share">
                            <i class="fas fa-share"></i>
                        </div>
                    </div>

                    <div class="card_image">
                        <img class="thumbnail" alt="moviepicture" :src="'data:image.*;base64,' + item.image">
                    </div>
                    <h2 class="card_title">{{ item.movieName }}</h2>
                    <h4 class="card_realease">{{ item.releaseDate }}</h4>

                    <div class="card_bottom">
                        <div class="card_bottom-comments"><i class="fas fa-comment-alt-dots"></i> {{ comments }}</div>
                        <div class="card_bottom-likes"><i class="fas fa-thumbs-up"></i> {{ likes }}</div>
                        <div class="card_bottom-dislikes"><i class="fas fa-thumbs-down"></i> {{ dislikes }}</div>
                    </div>

                    <!-- THIS WILL BE ON THE ADMIN INTERFACE -->
                    <div class="icons">
                        <button @click="updateCard(item.id)" class="update-btn"><i class="fas fa-edit"></i></button>
                        <button @click="deleteCard(item.id)" class="delete-btn"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MovieList",
        props: {
            movies: Array,    //this will contain the dinamic array which we have to foreach
            categories: Array   //this will contain the categories which belong to the actual movie
        },
        data() {
            return {
                SuccesMessage: '',
                errorMessage: '',
            }
        },
        methods: {
            routeToDetails(movieId) {

                if ($store.state.isLoggedIn) {
                    this.$router.push({ path: `/detailsuser/${movieId}` });
                }

                else if (!$store.state.isLoggedIn) {
                    this.$router.push({ path: `/detailsguest/${movieId}` });
                }
            },
            // deleteCard(id) {
            //     Axios.delete(`http://localhost:3000/movies/delete/${id}`)
            //     .then((response) => {

            //         if(response) {
            //             this.getList();
            //             this.SuccesMessage = "Item has been deleted";
            //         } 
            //         else if(!response) {
            //             this.errorMessage = "Something went wrong";
            //         }
            //     });
            // },
            // updateCard(id) {
            //     Axios.put(`http://localhost:3000/movies/update/${id}`, { setText: this.setMovieReview });
            //     this.setMovieReview = '';
            // },
            closeMessage() {
                this.SuccesMessage = '';
                this.errorMessage = '';
            }
        },
    }
</script>

<style lang="scss" scoped>
.success {
    width: auto;
    padding: 20px;
    border-radius: 10px;
    border: 6px solid $c-success;
    font-size: 20px;
    color: $c-white;
    background: $c-green-theme;
    z-index: 10;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @include flexCenter();

    i {
        font-size: 40px;
        cursor: pointer;
        transition: .3s;
        margin-left: 20px;

        &:hover {
            transform: scale(1.2);
        }
    }
}

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

    i {
        font-size: 40px;
        cursor: pointer;
        transition: .3s;
        margin-left: 20px;

        &:hover {
            transform: scale(1.2);
        }
    }
}

.movies_section {
    padding: 10px 0 50px;
    background-color: $c-dark-theme;

    .wrapper {
        @media #{$r-max-laptop-m} {
            width: calc(100% - 30px);
        }

        @media #{$r-max-mobile-l} {
            @include flexCenter();
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
            right: -40px;
            top: 10px;
            background-color: $c-green-theme;
            transition: right .3s ease;

            .info, .share {
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