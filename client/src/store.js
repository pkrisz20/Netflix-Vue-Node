import Axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        isLoggedIn: false,
        list: [],   //this array contains each movie as objects
        categories: [], //this array contains all categories
        filteredCategories: [],
        filterFromYear: null,
        filterToYear: null,
        movieDetails: [],
        actualUserData: {
            userId: null,
            username: '',
            email: '',
            image: null
        },
        successMessage: '', //this contains the success message from profile picture change
        errorMessage: '',   //this contains the error message from profile picture change
    },
    getters: {
        // userPasswordLength (state) {
        //     return state.actualUserData.password.length;
        // },
    },
    mutations: {
        GET_ALL_MOVIES (state, data) {
            state.list = data;
        },
        GET_ALL_CATEGORIES (state, data) {
            state.categories = [];
            data.forEach(item => {
                state.categories.push(item.category_name);
            });
        },
        GET_MOVIE_DETAILS (state, data) {
            state.movieDetails = data;
        },
        GET_ACTUAL_USER_DATA (state, data) {
            if (!data.status) {
                state.isLoggedIn = false;
            }

            else if (data.status) {
                state.isLoggedIn = true;
                state.actualUserData.userId = data.result[0].user_id;
                state.actualUserData.email = data.result[0].email;
                state.actualUserData.username = data.result[0].username;
                state.actualUserData.image = data.result[0].profile_pic;
            }
        },
        CHANGE_PROFILE_PICTURE (state, data) {
            if (data.status) {
                state.succesMessage = data.message;
            }

            else if (!data.status) {
                state.errorMessage = data.message;
            }
        },
        LOG_OUT (state, data) {
            if (data.status) {
                state.isLoggedIn = false;
                state.actualUserData.userId = null;
                state.actualUserData.email = "";
                state.actualUserData.username = "";
                state.actualUserData.image = null;
                state.categories = [];
            }
        },
        CANCEL_MESSAGES (state) {
            state.successMessage = "";
            state.errorMessage = "";
        }
    },

    actions: {
        async getAllMovies ({ commit }) {
            await Axios.get("http://localhost:3000/movies/get")
            .then((response) => {
                commit('GET_ALL_MOVIES', response.data);
            });
        },

        async getCategories ({ commit }) {
            await Axios.get("http://localhost:3000/movies/getcategories")
            .then((response) => {
                commit('GET_ALL_CATEGORIES', response.data);
            });
        },

        async getMovieDetails ({ commit }, movieId) {
            await Axios.get(`http://localhost:3000/movies/getmoviedetails/${movieId}`)
            .then((response) => {
                commit('GET_MOVIE_DETAILS', response.data);
            });
        },

        async getActualUserData ({ commit }) {
            await Axios.get("http://localhost:3000/getuserdata")
            .then((response) => {
                commit('GET_ACTUAL_USER_DATA', response.data);
            });
        },

        async updateProfilePicture ({ commit }, newProfilePicture) {
            await Axios.put("http://localhost:3000/changeprofile", { file: newProfilePicture })
            .then((response) => {
                commit('CHANGE_PROFILE_PICTURE', response.data);
            });
        },

        async logOut ({ commit }) {
            await Axios.put("http://localhost:3000/logout")
            .then((response) => {
                commit('LOG_OUT', response.data);
            });
        },
    }
});