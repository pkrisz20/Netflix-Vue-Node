<template>
    <div class="modalUpload" v-if="showForm">
        <div class="modal_bg">
            <form @submit.prevent="submitForm()" enctype="multipart/form-data">
                <i @click="openModal()" class="fas fa-times close-icon"></i>

                <label>Movie Title:</label>
                <input type="text" v-model="movieName" name="movieName">

                <label>Description:</label>
                <textarea cols="40" rows="10" maxlength="300" v-model="movieReview" name="movieReview"></textarea>
                <div class="text-length">{{ textLength }} / 300</div>

                <label>Release Date:</label>
                <input type="text" v-model="releaseDate" name="releaseDate">

                <input type="file" class="file-input" accept="image/*" @change="handleUploadFile" id="moviePoster">
                <label class="file-label" for="moviePoster"><i class="fas fa-upload upload-icon"></i> Index picture</label>

                <input type="file" class="file-input" accept="video/*" @change="handleUploadVideo" id="movieVideo">
                <label class="file-label" for="movieVideo"><i class="fas fa-upload upload-icon"></i> Movie</label>
                
                <button type="submit" class="submit-btn">{{ action }}</button>

                <div class="success" v-if="successMessage">{{ successMessage }} <i @click="closeMessage" class="fas fa-times"></i></div>
                <div class="error" v-if="errorMessage">{{ errorMessage }} <i @click="closeMessage" class="fas fa-times"></i></div>
            </form>
        </div>
    </div>
</template>

<script>
import Axios from "axios";
import { mapGetters } from "vuex";

    export default {
        name: "Form",
        data() {
            return {
                movieName: "",
                movieReview: "",
                releaseDate: "",
                showForm: false,
                selectedFile: null,
                errorMessage: "",
                successMessage: ""
            }
        },
        props: ['action'],
        computed: {
            textLength() {
                return this.movieReview.length;
            },
            ...mapGetters({
                getMovieByID: 'getMovieByID',
            }),
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

            handleUploadVideo(ev) {
                console.log(ev);
            },

            openModal() {
                this.showForm = !this.showForm;

                if (this.showForm) {
                    document.body.style.overflowY = 'hidden';
                }

                if (!this.showForm) {
                    document.body.style.overflowY = 'scroll';
                    this.movieName = "";
                    this.movieReview = "";
                    this.releaseDate = "";
                    this.selectedFile = null;
                    this.errorMessage = "";
                    this.successMessage = "";
                }
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
                    document.body.style.overflowY = 'scroll';
                }
            });
        },
        updated() {
            if (this.action == 'update') {
                this.getMovieByID.forEach(item => {
                    this.movieName = item.movieName;
                    this.movieReview = item.movieDescription;
                    this.releaseDate = item.releaseDate;
                });
            }
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
            width: auto;
            margin: 0 auto;
            background: $c-e;
            padding: 25px;
            border-radius: 6px;
            position: relative;
            z-index: 1;

            .close-icon {
                position: absolute;
                top: 5px;
                right: 5px;
                font-size: 20px;
                padding: 7px;
                color: $c-white;
                background-color: $c-red;
                border-radius: 5px;
                cursor: pointer;
                transition: .3s;
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
                }
            }

            label {
                font-size: 20px;
                color: $c-3;
            }

            input {
                height: 30px;
                width: 100%;
                font-size: 14px;
                outline: none;
                border: 1px solid $c-3;
                border-radius: 3px;
                font-family: $c-main-font;
            }

            textarea {
                outline: none;
                font-family: $c-main-font;
                border: 1px solid $c-3;
                border-radius: 3px;
                resize: none;
                font-size: 14px;
            }

            .text-length {
                font-size: 16px;
                color: $c-3;
                margin: 5px auto;
            }

            .file-input {
                display: none;
            }

            .file-label {
                background-color: $c-blue;
                color: $c-white;
                border-radius: 3px;
                width: 200px;
                height: 50px;
                margin: 10px auto;
                font-size: 16px;
                padding: 5px 0;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                transition: .3s;

                &:hover {
                    background-color: $c-middleblue;
                }
            }

            .submit-btn {
                padding: 6px 16px;
                background: $c-blue;
                font-size: 20px;
                color: $c-white;
                text-transform: uppercase;
                margin: 15px auto 0;
                border: none;
                cursor: pointer;
                transition: .3s;
                border-radius: 3px;
                font-family: $c-main-font;

                &:hover {
                    background-color: $c-middleblue;
                }
            }
        }
    }
}
</style>