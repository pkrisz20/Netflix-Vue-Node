<template>
    <div class="modalUpload" v-if="showForm">
        <div class="modal_bg">
            <form @submit.prevent="submitForm" enctype="multipart/form-data">
                <i @click="closeModal" class="fas fa-times close-icon"></i>

                <label>Movie Name:</label>
                <input type="text" v-model="movieName" name="movieName">

                <label>Review:</label>
                <textarea cols="40" rows="10" maxlength="75" v-model="movieReview" name="movieReview"></textarea>
                <div class="text-length">{{ textLength }} / 75</div>

                <input type="file" ref="file" class="file-input" accept="image/*" @change="handleUploadFile" id="moviePoster">
                <label class="file-label" for="moviePoster"><i class="fas fa-upload upload-icon"></i> Choose file</label>
                
                <button type="submit" class="submit-btn">INSERT</button>

                <div class="success" v-if="successMessage">{{ successMessage }} <i @click="closeMessage" class="fas fa-times"></i></div>
                <div class="error" v-if="errorMessage">{{ errorMessage }} <i @click="closeMessage" class="fas fa-times"></i></div>
            </form>

            <!-- <h2>Set Text on Update</h2>
            <input type="text" class="updateInput" v-model="setMovieReview"> -->
        </div>
    </div>
</template>

<script>
import Axios from "axios";

    export default {
        name: "Form",
        data() {
            return {
                movieName: '',
                movieReview: '',
                setMovieReview: '',
                showForm: false,
                selectedFile: null,
                errorMessage: '',
                successMessage: ''
            }
        },
        computed: {
            textLength() {
                return this.movieReview.length;
            }
        },
        methods: {
            handleUploadFile(ev) {
                const file = ev.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = e => {
                    this.selectedFile = e.target.result;
                }
            },

            openModal() {
                this.showForm = true;
            },

            closeModal() {
                this.showForm = false;
            },

            submitForm() {
                Axios.post("http://localhost:3000/movies/insert", {
                    movieName: this.movieName,
                    movieReview: this.movieReview,
                    file: this.selectedFile
                })
                .then((res) => {

                    if(!res.data[0]) {
                        this.errorMessage = res.data[1];
                    }
                    else if(res.data[0]) {
                        this.successMessage = res.data[1];
                    }
                })
                .catch((err) => {
                    this.errorMessage = err.message;
                });
                console.log("Data was sent to backend");
                this.movieName = '';
                this.movieReview = '';
            },

            closeMessage() {
                this.successMessage = '';
                this.errorMessage = '';
            }
        },
        mounted() {
            document.body.addEventListener("click", (event) => {
                const modal = document.querySelector('.modal_bg');
                if (event.target == modal) {
                    this.showForm = false;
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
.modalUpload {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;
    width: 100%;
    height: 100vh;

    .modal_bg {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            content: '';
            width: 100%;
            height: 100%;
            background-color: rgba($c-black, 0.8);
        }

        form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 400px;
            margin: 0 auto;
            background: $c-green-theme;
            padding: 15px;
            border-radius: 10px;
            position: relative;
            z-index: 1;

            .close-icon {
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 30px;
                color: $c-white;
                cursor: pointer;
                transition: .3s;

                &:hover {
                    transform: scale(1.3);
                }
            }

            .success {
                margin: 10px auto;
                padding: 8px 20px;
                border-radius: 5px;
                font-size: 20px;
                color: $c-white;
                background: $c-success;
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
                margin: 10px auto;
                padding: 8px 20px;
                border-radius: 5px;
                font-size: 20px;
                color: $c-white;
                background: $c-error;
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

            label {
                font-size: 25px;
                color: $c-e;
            }

            input {
                height: 30px;
                width: 300px;
                font-size: 20px;
                outline: none;
            }

            textarea {
                outline: none;
            }

            .text-length {
                font-size: 18px;
                color: $c-e;
                margin: 5px auto;
            }

            .file-input {
                display: none;
            }

            .file-label {
                background-color: $c-e;
                color: $c-black;
                width: 200px;
                height: 50px;
                margin: 10px auto;
                font-size: 20px;
                padding: 5px 0;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .submit-btn {
                padding: 5px 10px;
                background: $c-e;
                font-size: 24px;
                color: $c-black;
                margin: 15px auto;
                border: none;
                cursor: pointer;
                transition: .3s;
                border-radius: 5px;

                &:hover {
                    background-color: $c-b;
                }
            }
        }

        .updateInput {
            height: 24px;
            width: 200px;
            font-size: 18px;
            outline: none;
            margin: 0 auto 40px;
        }
    }
}
</style>