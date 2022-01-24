<template>
    <div>
        <div class="nav" :class="{ sticky: scrollPosition > 0 }">
            <div class="wrapper">
                <div class="logo">
                    <img alt="logo" class="logo-img" src="../assets/images/netflix.png">
                </div>

                <div class="nav-links">
                    <router-link class="link" to="/">Home</router-link>
                    <router-link class="link" to="/author">Author</router-link>
                    <Dropdown class="link submenu" :title="'Categories'" :items="movieCategories" @getSelected="writeOUTtype($event)"/>
                    <router-link class="link" to="/register">Register</router-link>
                    <router-link class="link" to="/login">Login</router-link>
                </div>

                <form class="search-form">
                    <input ref="searchBox"
                        class="search-field"
                        @blur="openSearchBar = false; searchText = ''"
                        v-model="searchText"
                        :class="{ open_search : openSearchBar }"
                        placeholder="Type here to search..." type="text" name="search">
                </form>

                <!-- SEARCH ICON -->
                <svg v-show="!openSearchBar" @click="searchBarMethod(true)" class="search-icon"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 487.95 487.95" style="enable-background:new 0 0 487.95 487.95" 
                xml:space="preserve"><path d="m481.8 453-140-140.1c27.6-33.1 44.2-75.4 44.2-121.6C386 85.9 299.5.2 193.1.2S0 86 0 191.4s86.5 191.1 192.9 191.1c45.2 0 86.8-15.5 119.8-41.4l140.5 140.5c8.2 8.2 20.4 8.2 28.6 0 8.2-8.2 8.2-20.4 0-28.6zM41 191.4c0-82.8 68.2-150.1 151.9-150.1s151.9 67.3 151.9 150.1-68.2 150.1-151.9 150.1S41 274.1 41 191.4z"/></svg>

                <!-- CLOSE ICON -->
                <svg v-show="openSearchBar" @click="searchBarMethod(false)" class="close-icon" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 47.971 47.971" xml:space="preserve">
                <path d="M28.228 23.986 47.092 5.122a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0L23.986 19.744 5.121.88a2.998 2.998 0 0 0-4.242 0 2.998 2.998 0 0 0 0 4.242l18.865 18.864L.879 42.85a2.998 2.998 0 1 0 4.242 4.241l18.865-18.864L42.85 47.091c.586.586 1.354.879 2.121.879s1.535-.293 2.121-.879a2.998 2.998 0 0 0 0-4.242L28.228 23.986z"/></svg>
            </div>
        </div>
        <transition name="fade" appear>
            <div v-if="scrollPosition > 300" class="scrollup-button" @click="scrollTop">
                <i class="fas fa-chevron-up"></i>
            </div>
        </transition>
    </div>
</template>

<script>
import Dropdown from '../components/Dropdown.vue';

    export default {
        name: "Header",
        components: {
            Dropdown
        },
        data() {
            return {
                scrollPosition: null,
                movieCategories: [
                    'Series',
                    'Movies',
                    'New & Popular'
                ],
                selectedType: null,
                openSearchBar: false,
                searchText: '',
            }
        },
        methods: {
            writeOUTtype(emitType) {
                this.selectedType = emitType;
                console.log(this.selectedType);
            },

            scrollTop() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },

            updateScroll() {
                this.scrollPosition = window.scrollY;
            },
            searchBarMethod(value) {
                if (value) {
                    this.openSearchBar = true;
                    this.$refs.searchBox.focus();
                }

                else if (!value) {
                    this.searchText = '';
                    this.openSearchBar = false;
                }
            }
        },
        mounted() {
            window.addEventListener('scroll', this.updateScroll);
        },
    }
</script>

<style lang="scss">

.fade-enter-active,
.fade-leave-active {
    transition: all .2s ease-in-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.scrollup-button {
    position: fixed;
    bottom: 120px;
    right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: $c-red;
    z-index: 10;
    cursor: pointer;

    i {
        font-size: 25px;
        color: $c-white;
        margin: 25px;
    }
}

.nav {
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 90px;
    transition: .4s;

    .wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .logo {
            width: auto;
            height: 80%;

            &-img {
                transition: .4s;
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
            }
        }

        .nav-links {
            display: flex;

            .link {
                margin: 0 20px;
                font-weight: bold;
                color: $c-d;
                text-decoration: none;
                transition: .3s;
                cursor: pointer;
                font-size: 16px;

                &:hover {
                    color: $c-green-theme;
                }

                &.router-link-exact-active {
                    color: $c-green-theme;
                }

                &.submenu {
                    position: relative;
                    display: flex;
                    justify-content: center;

                    i {
                        padding-left: 5px;
                    }
                }
            }
        }

        .search-form {
            position: absolute;
            top: 30px;
            right: 50px;
            transition: .3s;

            .search-field {
                transition: .3s;
                width: 0;
                height: 30px;
                padding: 0;
                font-size: 14px;
                background: transparent;
                font-family: $c-main-font;
                outline: none;
                border: none;
                border-bottom: solid 1px $c-white;
                color: $c-white;

                &::placeholder {
                    color: $c-white;
                }
            }

            .open_search {
                width: 160px;
            }
        }

        .search-icon, .close-icon {
            width: 20px;
            height: 20px;
            fill: $c-white;
            cursor: pointer;
            margin: 0 10px;
            transition: .3s;
            background-color: none;
        }
    }
}

.sticky {
    background: $c-dark-theme;
    height: 60px;

    .wrapper {

        .logo {
            height: 65%;
        }

        .nav-links {

            .link {
                font-size: 14px;

                &.submenu {
                    
                    .sub-items {
                        background-color: $c-dark-theme;

                        .sub-row {
                            .sub-link {
                                font-size: 14px;
                            }
                        }
                    }
                }
            }
        }

        .search-form {
            top: 20px;

            .search-field {
                height: 22px;
            }
        }

        .search-icon, .close-icon {
            width: 16px;
            height: 16px;
        }
    }
}
</style>