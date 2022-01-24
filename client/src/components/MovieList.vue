<template>
    <div>
        <div class="success" v-if="SuccesMessage">{{ SuccesMessage }} <i @click="closeMessage" class="fas fa-times"></i></div>
        <div class="error" v-if="errorMessage">{{ errorMessage }} <i @click="closeMessage" class="fas fa-times"></i></div>
        
        <div class="listCards">

            <div class="card" v-for="item in movieList" :key="item.id">
                <div class="movie_image">
                    <img alt="moviepicture" :src="'data:image.*;base64,' + item.image">
                </div>
                <h1>{{ item.movieName }}</h1>
                <h4>{{ item.movieReview }}</h4>
                <div class="icons">
                    <!-- <button @click="updateCard(item.id)" class="update-btn"><i class="fas fa-edit"></i></button> -->
                    <button @click="deleteCard(item.id)" class="delete-btn"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import Axios from "axios";

    export default {
        name: "MovieList",
        data() {
            return {
                movieList: [],
                SuccesMessage: '',
                errorMessage: ''
            }
        },
        methods: {
            getList() {
                Axios.get("http://localhost:3000/movies/get")
                .then((response) => {
                    this.movieList = response.data;
                });
            },
            deleteCard(id) {
                Axios.delete(`http://localhost:3000/movies/delete/${id}`)
                .then((response) => {

                    if(response) {
                        this.getList();
                        this.SuccesMessage = "Item has been deleted";
                    } 
                    else if(!response) {
                        this.errorMessage = "Something went wrong";
                    }
                });
            },
            updateCard(id) {
                Axios.put(`http://localhost:3000/movies/update/${id}`, { setText: this.setMovieReview });
                this.setMovieReview = '';
            },
            closeMessage() {
                this.SuccesMessage = '';
                this.errorMessage = '';
            }
        },
        mounted() {
            this.$nextTick(this.getList());
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
        display: flex;
        justify-content: center;
        align-items: center;

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
        display: flex;
        justify-content: center;
        align-items: center;

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

.listCards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        width: 1200px;
        margin: 30px auto 60px;

        .card {
            border: 2px solid $c-6;
            border-radius: 10px;
            background: $c-a;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 5px;
            cursor: pointer;
            overflow: hidden;
            transition: .3s;

            &:hover {
                background-color: $c-green-theme;

                .movie_image {
                    transform: scale(1.1);
                }

                h1, h4 {
                    color: $c-white;
                }
            }

            h1, h4 {
                transition: .3s;
                color: $c-3;
                padding: 0 10px;
                text-align: justify;
            }

            .movie_image {
                transition: .3s;
                width: 100%;
                height: 100%;

                img {
                    object-fit: cover;
                    object-position: center;
                    width: 100%;
                    height: 100%;
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