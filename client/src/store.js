import Axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        isLoggedIn: false,
        list: [],
        categories: [],
        filteredCategories: [],
        filterFromYear: null,
        filterToYear: null,
        movieDetails: [],
        categoriesDetails: [],
        likes: [],
        actualUserData: {
            userId: null,
            username: '',
            email: '',
            image: null
        },
        comments: [],   //comments of the moviedetails
        commentsInfo: '',
        eachComment: [],    //comments count for movies list
        reactions: [],
        successMessage: '', //this contains the success message from profile picture change
        errorMessage: '',   //this contains the error message from profile picture change
        httpStatus: 0,
        favourites: [],
    },
    getters: {
        getCommentsCount (state) {
            return state.comments.length;
        },
        getReactionLikes (state) {
            return id => state.reactions.filter(item => {
                return item.comment_id == id && item.is_liked == 1
            }).length;
        },
        getReactionDislikes (state) {
            return id => state.reactions.filter(item => {
                return item.comment_id == id && item.is_liked == 0
            }).length;
        },
        getLikedComments (state) {
            return comment => {
                var isLiked = false;
                state.reactions.map(item => {
                    if (comment == item.comment_id && item.is_liked == 1 && item.user_id == state.actualUserData.userId) {
                        isLiked = true;
                    }
                });
                return isLiked;
            }
        },
        getDislikedComments (state) {
            return comment => {
                var isNotLiked = false;
                state.reactions.map(item => {
                    if (comment == item.comment_id && item.is_liked == 0 && item.user_id == state.actualUserData.userId) {
                        isNotLiked = true;
                    }
                });
                return isNotLiked;
            }
        },
        isLikedMovie (state) {
            return movie => {
                var isLikedMovie;
                state.likes.map(item => {
                    if (movie == item.movie_id && item.is_liked == 1 && item.user_id == state.actualUserData.userId) {
                        isLikedMovie = true;
                    }
                });
                return isLikedMovie;
            }
        },
        isDislikedMovie (state) {
            return movie => {
                var isDislikedMovie;
                state.likes.map(item => {
                    if (movie == item.movie_id && item.is_liked == 0 && item.user_id == state.actualUserData.userId) {
                        isDislikedMovie = true;
                    }
                });
                return isDislikedMovie;
            }
        },
        getDislikesCount (state) {
            return movie => state.likes.filter(item => {
                return item.movie_id == movie && item.is_liked == 0
            }).length;
        },
        getLikesCount (state) {
            return movie => state.likes.filter(item => {
                return item.movie_id == movie && item.is_liked == 1
            }).length;
        },
        getCommentsForList (state) {
            return movie => state.eachComment.filter(item => {
                return item.movie_id == movie
            }).length;
        },
        getFavourites (state) {
            var movieIDs = [];
            var filteredFavourites = [];

            state.favourites.map(item => {
                if (item.user_id == state.actualUserData.userId) {
                    movieIDs.push(item.movie_id);
                }
            });

            state.list.filter(item => {
                movieIDs.forEach(i => {
                    if (item.id == i) {
                        filteredFavourites.push(item);
                    }
                });
            });
            return filteredFavourites;
        },
        checkIsFavourite (state) {
            return id => {
                var isFavourite = false;
                state.favourites.map(item => {
                    if (id == item.movie_id && item.user_id == state.actualUserData.userId) {
                        isFavourite = true;
                    }
                });
                return isFavourite;
            }
        }
    },
    mutations: {
        GET_ALL_MOVIES (state, data) {
            if (!data.status) {
                return;
            }

            else if (data.status) {
                state.list = data.result;
            }
        },
        GET_ALL_CATEGORIES (state, data) {
            state.categories = [];
            data.forEach(item => {
                state.categories.push(item.category_name);
            });
        },
        GET_MOVIE_DETAILS (state, data) {
            state.movieDetails = data.movie;
            state.categoriesDetails = [];
            data.categories.forEach(item => {
                state.categoriesDetails.push(item.category_name);
            });
            state.httpStatus = 200;
        },
        GET_ACTUAL_USER_DATA (state, response) {
            if (!response.data.status) {
                state.isLoggedIn = false;
            }

            else if (response.data.status) {
                state.actualUserData.userId = response.data.result[0].user_id;
                state.actualUserData.email = response.data.result[0].email;
                state.actualUserData.username = response.data.result[0].username;
                state.actualUserData.image = response.data.result[0].profile_pic;
                state.httpStatus = 200;
            }
        },
        CHANGE_PROFILE_PICTURE (state, data) {
            if (data.status) {
                state.successMessage = data.message;
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
            }
        },
        CANCEL_MESSAGES (state) {
            state.successMessage = "";
            state.errorMessage = "";
        },
        SET_LOGIN_STATUS (state, data) {
            if (data.loginStatus) {
                state.isLoggedIn = true;
            }

            else if (!data.loginStatus) {
                state.isLoggedIn = false;
            }
        },
        GET_COMMENTS (state, data) {
            state.comments = [];
            state.commentsInfo = '';

            if (!data.status) {
                state.commentsInfo = data.message;
                state.httpStatus = 200;
            }

            else if (data.status == null) {
                state.commentsInfo = data.message;
                state.httpStatus = 200;
            }

            else if (data.status) {
                data.result.forEach(item => {
                    state.comments.push(item);
                });
                state.httpStatus = 200;
            }
        },
        GET_EACH_COMMENT (state, data) {
            state.eachComment = [];
            if (!data.status) {
                state.commentsInfo = data.message;
            }

            else if (data.status) {
                data.result.forEach(item => {
                    state.eachComment.push(item);
                });
            }
        },
        GET_REACTIONS (state, data) {
            state.reactions = [];
            if (!data.status) {
                state.commentsInfo = data.message;
            }

            else if (data.status === null) {
                state.reactions = [];
            }

            else if (data.status) {
                data.result.forEach(i => {
                    state.reactions.push(i);
                });
            }
        },
        GET_LIKES (state, data) {
            state.likes = [];
            if (!data.status) {
                console.log(data.message);
            }

            else if (data.status === null) {
                state.likes = [];
            }

            else if (data.status) {
                data.result.forEach(i => {
                    state.likes.push(i);
                });
            }
        },
        GET_FAVOURITES (state, data) {
            state.favourites = [];
            if (!data.status) {
                console.log(data.message);
                state.httpStatus = 200;
            }

            else if (data.status == null) {
                state.favourites = [];
                state.httpStatus = 200;
            }

            else if (data.status) {
                data.result.forEach(i => {
                    state.favourites.push(i);
                });
                state.httpStatus = 200;
            }
        },
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
            this.state.httpStatus = 0;
            await Axios.get(`http://localhost:3000/movies/getmoviedetails/${movieId}`)
            .then((response) => {
                commit('GET_MOVIE_DETAILS', response.data);
            });
        },

        async getActualUserData ({ commit }) {
            this.state.httpStatus = 0;
            await Axios.get("http://localhost:3000/users/getuserdata")
            .then((response) => {
                commit('GET_ACTUAL_USER_DATA', response);
            });
        },

        async updateProfilePicture ({ commit }, newProfilePicture) {
            const data = new FormData();
            data.append("image", newProfilePicture);

            await Axios.post("http://localhost:3000/users/changeprofile", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                commit('CHANGE_PROFILE_PICTURE', response.data);
            });
        },

        async logOut ({ commit }) {
            await Axios.put("http://localhost:3000/users/logout")
            .then((response) => {
                commit('LOG_OUT', response.data);
            });
        },

        async getLoginStatus ({ commit }) {
            await Axios.get("http://localhost:3000/users/getloginstatus")
            .then((response) => {
                commit('SET_LOGIN_STATUS', response.data);
            });
        },

        async getComments ({ commit }, movieID) {
            this.state.comments = [];
            this.state.commentsInfo = '';
            this.state.httpStatus = 0;
            await Axios.get(`http://localhost:3000/movies/getcomments/${movieID}`)
            .then((response) => {
                commit('GET_COMMENTS', response.data);
            });
        },

        async getEachComment ({ commit }) {
            this.state.eachComment = [];
            await Axios.get(`http://localhost:3000/movies/geteachcomment`)
            .then((response) => {
                commit('GET_EACH_COMMENT', response.data);
            });
        },

        async getReactions ({ commit }) {
            this.state.reactions = [];
            await Axios.get(`http://localhost:3000/movies/getreactions`)
            .then((response) => {
                commit('GET_REACTIONS', response.data);
            });
        },

        async addReactionToComment ({ dispatch }, [comment, reaction]) {
            await Axios.post("http://localhost:3000/movies/addreaction", { comment, reaction })
            .then((response) => {
                if (response.data.status) {
                    dispatch("getReactions");
                }
                else if (!response.data.status) {
                    console.log("Something went wrong");
                }
            });
        },

        async updateReaction ({ dispatch }, [comment, reaction, update]) {
            await Axios.put("http://localhost:3000/movies/updatereaction", { comment, reaction, update })
            .then((response) => {
                if (response.data.status) {
                    dispatch("getReactions");
                }
                else if (!response.data.status) {
                    console.log("Something went wrong");
                }
            });
        },

        async getLikes ({ commit }) {
            this.state.likes = [];
            await Axios.get(`http://localhost:3000/movies/getlikes`)
            .then((response) => {
                commit('GET_LIKES', response.data);
            });
        },

        async addFeedback ({ dispatch }, [movie, reaction]) {
            await Axios.post("http://localhost:3000/movies/addfeedback", { movie, reaction })
            .then((response) => {
                if (response.data.status) {
                    dispatch("getLikes");
                }
                else if (!response.data.status) {
                    console.log("Something went wrong");
                }
            });
        },

        async updateFeedback ({ dispatch }, [movie, reaction, update]) {
            await Axios.put("http://localhost:3000/movies/updatefeedback", { movie, reaction, update })
            .then((response) => {
                if (response.data.status) {
                    dispatch("getLikes");
                }
                else if (!response.data.status) {
                    console.log("Something went wrong");
                }
            });
        },

        async getFavourites ({ commit }) {
            this.state.favourites = [];
            this.state.httpStatus = 0;
            await Axios.get(`http://localhost:3000/movies/getfavourites`)
            .then((response) => {
                commit('GET_FAVOURITES', response.data);
            });
        },
    }
});