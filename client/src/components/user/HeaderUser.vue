<template>
<div class="nav-user" :class="{ sticky: scrollPosition > 0 }">
    <div class="wrapper-user">

        <div class="left-side">
            <div class="logo">
                <img alt="logo" class="logo-img" src="../../assets/images/netflix.png">
            </div>

            <div class="nav-links" :class="{ open_sidebar: openSidebar }">
                <ul class="nav-links-list">
                    <router-link class="link" to="/userinterface">Home</router-link>
                    <Dropdown
                        class="link submenu_user"
                        :title="'Categories'"
                        :links="returnCategories"
                        @getSelected="categoriesRoute($event)"
                    />
                    <router-link class="link" to="/favourites">My Favorites</router-link>
                    <li class="link logout" @click="logOut">Log Out</li>
                </ul>
            </div>
        </div>

        <!-- SEARCH BOX ON MOBILE VIEW -->
        <div class="search_container_mobile">
            <div class="search-box desktop-hide">
                <form class="search-form">
                    <input ref="searchBoxMobile"
                        :class="{ open_search : openSearchBar }"
                        v-model="searchText"
                        @blur="openSearchBar = false; searchText = ''"
                        class="search-field"
                        placeholder="Type here to search..." type="text" name="search"
                    />
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

        <div class="user-box">

            <!-- SEARCH BOX ON DESKTOP VIEW -->
            <div class="search-box mobile-hide">
                <form class="search-form">
                    <input ref="searchBox"
                        :class="{ open_search : openSearchBar }"
                        v-model="searchText"
                        @blur="openSearchBar = false; searchText = ''"
                        class="search-field"
                        placeholder="Type here to search..." type="text" name="search"
                    />
                </form>

                <svg v-show="!openSearchBar" @click="searchBarMethod(true)" class="search-icon"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 487.95 487.95" style="enable-background:new 0 0 487.95 487.95" 
                    xml:space="preserve"><path d="m481.8 453-140-140.1c27.6-33.1 44.2-75.4 44.2-121.6C386 85.9 299.5.2 193.1.2S0 86 0 191.4s86.5 191.1 192.9 191.1c45.2 0 86.8-15.5 119.8-41.4l140.5 140.5c8.2 8.2 20.4 8.2 28.6 0 8.2-8.2 8.2-20.4 0-28.6zM41 191.4c0-82.8 68.2-150.1 151.9-150.1s151.9 67.3 151.9 150.1-68.2 150.1-151.9 150.1S41 274.1 41 191.4z"/></svg>

                <svg v-show="openSearchBar" @click="searchBarMethod(false)" class="close-icon" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 47.971 47.971" xml:space="preserve">
                    <path d="M28.228 23.986 47.092 5.122a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0L23.986 19.744 5.121.88a2.998 2.998 0 0 0-4.242 0 2.998 2.998 0 0 0 0 4.242l18.865 18.864L.879 42.85a2.998 2.998 0 1 0 4.242 4.241l18.865-18.864L42.85 47.091c.586.586 1.354.879 2.121.879s1.535-.293 2.121-.879a2.998 2.998 0 0 0 0-4.242L28.228 23.986z"/></svg>
            </div>
            
            <!-- CHATS ICON -->
                <svg class="svg-chats" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 324.143 324.143"
                    style="enable-background:new 0 0 324.143 324.143" xml:space="preserve">
                    <circle cx="88.071" cy="164.571" r="19"/><circle cx="162.071" cy="164.571" r="19"/>
                    <path d="M162.071 0C73.162 0 .83 72.332.83 161.241c0 37.076 12.788 73.004 36.1 101.677-6.65 16.756-17.788 31.245-32.401 42.089a7.497 7.497
                    0 0 0-2.94 7.177 7.497 7.497 0 0 0 4.985 5.942 111.667 111.667 0 0 0 36.182 6.017c19.572 0 38.698-5.093 55.569-14.763 20.158 8.696 41.584 13.104
                    63.747 13.104 88.909 0 161.241-72.333 161.241-161.242S250.98 0 162.071 0zm0 307.483c-21.32 0-41.881-4.492-61.11-13.351a7.495 7.495 0 0 
                    0-7.102.443c-15.313 9.529-32.985 14.566-51.104 14.566a96.601 96.601 0 0 1-17.981-1.684c12.521-12.12 22.014-26.95 27.788-43.547a7.499 7.499 0 0 0-1.398-7.354C28.378 230.07 15.83 196.22 15.83 161.241 15.83 80.604 81.434 15 162.071 15s146.241 65.604 146.241 146.241c.001 80.639-65.603 146.242-146.241 146.242z"/>
                    <circle cx="236.071" cy="164.571" r="19"/>
                </svg>

            <!-- NOTIFICATIONS PANEL ON DESKTOP VIEW -->
            <div class="user-box-notifications">
                <svg @click="openNotificationPanel" class="svg-notifications" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M427.68,351.43C402,320,383.87,304,383.87,217.35,383.87,138,343.35,109.73,310,96c-4.43-1.82-8.6-6-9.95-10.55C294.2,65.54,277.8,48,256,48S217.79,65.55,212,85.47c-1.35,4.6-5.52,8.71-9.95,10.53-33.39,13.75-73.87,41.92-73.87,121.35C128.13,304,110,320,84.32,351.43,73.68,364.45,83,384,101.61,384H410.49C429,384,438.26,364.39,427.68,351.43Z" style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
                <path d="M320,384v16a64,64,0,0,1-128,0V384" style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>

                <div class="notifications-panel" v-if="actualWidth >= 1024" :class="{ open_notif_desktop : IsOpenNotification && actualWidth >= 1024 }">

                    <div class="notifications-panel_container">

                        <div class="notifications"> <!-- HERE NEEDS THE V-FOR -->
                            <div class="notifications-row">
                                <p class="notifications-row_text">A new movie was added into the gallery.</p>
                                <p class="notifications-row_time">8 minutes ago</p>
                            </div>
                            <div class="notifications-row">
                                <p class="notifications-row_text">Jhon has commented to your post.</p>
                                <p class="notifications-row_time">16 minutes ago</p>
                            </div>
                            <div class="notifications-row">
                                <p class="notifications-row_text">Jhon has commented to your post.</p>
                                <p class="notifications-row_time">16 minutes ago</p>
                            </div>
                            <div class="notifications-row">
                                <p class="notifications-row_text">Jhon has commented to your post.</p>
                                <p class="notifications-row_time">16 minutes ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- NOTIFICATIONS PANEL ON MOBILE VIEW -->
            <div class="notifications-panel_mobile" v-if="actualWidth < 1024" :class="{ open_notif_mobile : IsOpenNotification && actualWidth < 1024 }">

                <div class="notifications"> <!-- HERE NEEDS THE V-FOR -->
                    <div class="notifications-row">
                        <p class="notifications-row_text">A new movie was added into the gallery.</p>
                        <p class="notifications-row_time">8 minutes ago</p>
                    </div>
                    <div class="notifications-row">
                        <p class="notifications-row_text">Jhon has commented to your post.</p>
                        <p class="notifications-row_time">16 minutes ago</p>
                    </div>
                    <div class="notifications-row">
                        <p class="notifications-row_text">Jhon has commented to your post.</p>
                        <p class="notifications-row_time">16 minutes ago</p>
                    </div>
                    <div class="notifications-row">
                        <p class="notifications-row_text">Jhon has commented to your post.</p>
                        <p class="notifications-row_time">16 minutes ago</p>
                    </div>
                </div>
            </div>

            <div class="profile_mobile">
                <i @click="goProfilePage" class="fal fa-user-circle"></i>
            </div>

            <div @click="openMenu" class="hamburgermenu" :class="{ open_menu: openSidebar }">
                <div class="bar bar1"></div>
                <div class="bar bar2"></div>
                <div class="bar bar3"></div>
            </div>

            <div class="user-box-pic">
                <img
                    v-if="returnUserProfile == null"
                    class="user-img"
                    alt="user profile picture"
                    src="../../assets/images/default_profile.jpg"
                />

                <img
                    v-else-if="returnUserProfile != null"
                    class="user-img"
                    alt="user-profile-picture"
                    :src="getImagePath"
                />

                <div class="user-options" v-show="isOpenOptions">
                    <div class="user-options-list">
                        <ul class="list">
                            <li class="list-item" @click="goProfilePage">Profile</li>
                            <li class="list-item" @click="logOut">Log Out</li>
                        </ul>
                    </div>
                </div>
            </div>

            <h5 class="username" @click="openUserOptions">{{ returnUsername }}</h5>
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
import { mapState } from "vuex";
import Dropdown from '../global/Dropdown.vue';
import Axios from 'axios';
Axios.defaults.withCredentials = true;

    export default {
        name: "HeaderUser",
        components: {
            Dropdown,
        },
        data() {
            return {
                openSearchBar: false,
                IsOpenNotification: false,
                isOpenOptions: false,
                searchText: '',
                openSidebar: false,
                actualWidth: 0,
                scrollPosition: null
            }
        },
        computed: {
            ...mapState({
                returnUsername: state => state.actualUserData.username,
                returnUserProfile: state => state.actualUserData.image,
                returnCategories: state => state.categories,
            }),
            getImagePath () {
                return require('../../../../server/uploads/profiles/' + this.returnUserProfile);
            }
        },
        // return the actual width of the window
        created() {
            window.addEventListener("resize", this.onResize);
        },
        destroyed() {
            window.removeEventListener("resize", this.onResize);
        },

        methods: {
            onResize() {
                this.actualWidth = window.innerWidth;
            },

            updateScroll() {
                this.scrollPosition = window.scrollY;
            },

            scrollTop() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },

            categoriesRoute(link) {
                this.$router.push({ path: `/moviesuser/${link}` });
                console.log(link);
            },

            openMenu() {
                this.openSidebar = !this.openSidebar;

                if (this.openSidebar) {
                    document.body.style.overflowY = 'hidden';
                }

                else if (!this.openSidebar) {
                    document.body.style.overflowY = 'scroll';
                }
            },

            searchBarMethod(value) {
                if (value) {
                    this.openSearchBar = true;
                    this.$refs.searchBox.focus();
                    this.$refs.searchBoxMobile.focus();
                }

                else if (!value) {
                    this.searchText = '';
                    this.openSearchBar = false;
                }
            },

            openNotificationPanel() {
                this.IsOpenNotification = !this.IsOpenNotification;
                this.isOpenOptions = false;
            },

            openUserOptions() {
                this.isOpenOptions = !this.isOpenOptions;
                this.IsOpenNotification = false;
            },

            logOut() {
                this.$store.dispatch("logOut");
                this.$router.push({ name: 'Login'});
            },

            goProfilePage() {
                this.$router.push({ name: 'Profile'});
            }
        },
        mounted() {
            //return the actual scrollposition number
            window.addEventListener('scroll', this.updateScroll);

            //get the window width when the website is loaded
            this.actualWidth = window.innerWidth;

            //close panels on click outside of the elements
            document.addEventListener('click', (event) => {
                if (event.target.closest('.username')) return;
                if (event.target.closest('.svg-notifications')) return;
                if (event.target.closest('.user-options')) return;
                if (event.target.closest('.notifications-panel')) return;
                if (event.target.closest('.notifications-panel_mobile')) return;

                this.isOpenOptions = false;
                this.IsOpenNotification = false;
            });

            //close the sidebar if clicks outside
            document.addEventListener("click", (event) => {
                if (event.target.closest('.hamburgermenu')) return;
                if (event.target.closest('.nav-links')) return;
                if (this.openSidebar === true) {
                    this.openSidebar = false;
                    document.body.style.overflowY = 'scroll';
                }
            });

            this.$store.dispatch('getCategories');
            this.$store.dispatch('getActualUserData');
        },
    }
</script>

<style lang="scss">
.nav-user {
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100vw;
    height: 60px;
    transition: .4s;
    background-color: $c-dark-theme;

    @media #{$r-laptop-s} {
        background-color: rgba($c-dark-theme, 0.5);
    }

    @media #{$r-max-laptop-s} {
        height: 85px;
    }

    .wrapper-user {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;

        @media #{$r-max-laptop-s} {
            flex-direction: column;
            justify-content: center;
        }

        .left-side {
            width: auto;
            height: 100%;
            display: flex;
            align-items: center;

            .logo {
                width: auto;
                height: 65%;

                @media #{$r-max-laptop-s} {
                    position: absolute;
                    left: 8px;
                    top: 6px;
                    height: 35px;
                }
                
                &-img {
                    transition: .4s;
                    width: 100%;
                    height: 100%;
                    @include object-fit();
                }
            }

            .nav-links {

                @media #{$r-max-laptop-s} {
                    position: absolute;
                    right: -320px;
                    top: 85px;
                    width: 320px;
                    height: calc(100vh - 85px);
                    background-color: $c-dark-theme;
                    z-index: 5;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    overflow: auto;
                    transition: right .3s ease-in-out;
                }

                @media #{$r-max-mobile-s} {
                    width: 100vw;
                    right: -100vw;
                }

                &-list {
                    display: flex;
                    padding: 0;
                    margin: 10px 0;
                    list-style-type: none;

                    @media #{$r-max-laptop-s} {
                        flex-direction: column;
                        align-items: center;
                    }

                    .link {
                        margin: 0 15px;
                        font-weight: bold;
                        color: $c-d;
                        text-decoration: none;
                        transition: .3s;
                        font-size: 14px;
                        cursor: pointer;

                        @media #{$r-max-laptop-s} {
                            margin: 15px 0;
                        }

                        &:hover {
                            color: $c-green-theme;
                        }

                        &.router-link-exact-active {
                            color: $c-green-theme;
                        }

                        &.logout {
                            display: none;
                            
                            @media #{$r-max-laptop-s} {
                                display: block;
                            }
                        }

                        &.submenu_user {
                            position: relative;
                            display: flex;
                            justify-content: center;

                            @media #{$r-max-laptop-s} {
                                flex-direction: column;
                                align-items: center;
                            }

                            i {
                                padding-left: 5px;

                                @media #{$r-max-laptop-s} {
                                    display: none;
                                }
                            }

                            .sub-items {
                                background-color: rgba($c-dark-theme, 0.5);
                                position: absolute;
                                top: calc(100% + 21px);
                                max-height: 200px;
                                overflow-y: auto;

                                @media #{$r-max-laptop-m} {
                                    top: calc(100% + 21px);
                                    align-items: flex-start;
                                }

                                @media #{$r-max-laptop-s} {
                                    position: relative;
                                    background-color: transparent;
                                    align-items: center;
                                    max-height: 100%;
                                    overflow-y: visible;
                                }
                            }
                        }
                    }
                }
            }

            .open_sidebar {
                right: 0;
            }
        }

        .user-box {
            width: auto;
            height: 100%;
            display: flex;
            align-items: center;

            @media #{$r-max-laptop-s} {
                width: 100%;
                justify-content: space-evenly;
            }

            .svg-chats {
                fill: $c-white;
                cursor: pointer;
                margin: 0 10px;
                width: 20px;
                height: 20px;
                transition: .3s;

                &:hover {
                    fill: $c-green-theme;
                }
            }

            .svg-upload {
                fill: $c-white;
                cursor: pointer;
                margin: 0 10px;
                width: 20px;
                height: 20px;
                transition: .3s;

                &:hover {
                    fill: $c-green-theme;
                }
            }

            &-notifications {
                position: relative;
                display: flex;
                align-items: center;

                .svg-notifications {
                    stroke: $c-white;
                    fill: transparent;
                    cursor: pointer;
                    margin: 0 10px;
                    width: 25px;
                    height: 25px;
                    transition: .3s;

                    &:hover {
                        stroke: $c-green-theme;
                    }
                }

                .notifications-panel {
                    position: absolute;
                    top: 58px;
                    right: -12px;
                    width: 320px;
                    height: auto;
                    opacity: 0;
                    visibility: hidden;
                    transition: all .3s ease-in-out;

                    &_container {
                        position: relative;
                        height: auto;
                        width: 100%;

                        @media #{$r-laptop-s} {
                            &::before {
                                content: '';
                                border-style: solid;
                                border-bottom: 15px solid $c-c;
                                border-top: 20px solid transparent;
                                border-left: 14px solid transparent;
                                border-right: 14px solid transparent;
                                position: absolute;
                                top: -35px;
                                right: 20px;
                            }
                        }

                        .notifications {
                            height: 350px;
                            overflow-y: auto;
                            background-color: $c-c;

                            @media #{$r-max-laptop-s} {
                                position: absolute;
                                left: -320px;
                                top: 80px;
                                width: 320px;
                                height: 100vh;
                                z-index: 5;
                                transition: left .3s ease-in-out;
                            }

                            @media #{$r-max-mobile-s} {
                                width: 100vw;
                                left: -100vw;
                            }

                            &-row {
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                background-color: transparent;
                                color: $c-3;
                                margin: 10px;
                                padding: 8px;
                                border-radius: 3px;
                                border: 1px solid $c-3;
                                cursor: pointer;
                                transition: all .3s ease-in-out;

                                &:hover {
                                    transform: scale(1.03);
                                    color: $c-c;
                                    background-color: $c-3;
                                }

                                &_text {
                                    margin: 0;
                                    text-align: justify;
                                    font-size: 16px;
                                }

                                &_time {
                                    margin: 0;
                                    font-weight: 600;
                                    font-size: 13px;
                                }
                            }
                        }
                    }
                }

                .open_notif_desktop {
                    opacity: 1;
                    visibility: visible;
                }
            }

            .notifications-panel_mobile {
                position: absolute;
                top: 85px;
                width: 320px;
                left: -320px;
                height: 100vh;
                background-color: $c-3;
                border-radius: 3px;
                transition: left .3s ease-in-out;

                @media #{$r-max-mobile-s} {
                    width: 100vw;
                    left: -100vw;
                }

                .notifications {
                    height: 100%;
                    overflow-y: auto;

                    &-row {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        background-color: $c-c;
                        color: $c-3;
                        margin: 10px;
                        padding: 8px;
                        border-radius: 5px;

                        &_text {
                            margin: 0;
                            text-align: justify;
                            font-size: 16px;
                        }

                        &_time {
                            margin: 0;
                            font-weight: 600;
                            font-size: 13px;
                        }
                    }
                }
            }

            .open_notif_mobile {
                left: 0;
            }

            .profile_mobile {
                display: none;
                margin: 0 10px;

                @media #{$r-max-laptop-s} {
                    display: block;
                }

                i {
                    font-size: 24px;
                    color: $c-white;
                }
            }

            .open_menu {
                .bar1 {
                    transform: translateY(8px) rotate(45deg);
                }

                .bar2 {
                    transform: translateX(-15px);
                    opacity: 0;
                }

                .bar3 {
                    transform: translateY(-8px) rotate(-45deg);
                }
            }

            .hamburgermenu {
                width: 25px;
                height: 30px;
                margin: 0 10px;
                display: none;
                flex-direction: column;
                justify-content: space-evenly;

                @media #{$r-max-laptop-s} {
                    display: flex;
                }

                .bar {
                    background-color: $c-white;
                    width: 100%;
                    height: 2px;
                    transition: all .3s ease-in-out;
                }
            }

            &-pic {
                width: 45px;
                height: 45px;
                position: relative;

                @media #{$r-max-laptop-s} {
                    display: none;
                }

                .user-img {
                    width: 100%;
                    height: 100%;
                    @include object-fit();
                    border-radius: 100%;
                }

                .user-options {
                    position: absolute;
                    top: 68px;
                    left: -10px;
                    width: 120px;
                    height: auto;
                    background-color: $c-c;
                    border-radius: 3px;

                    &-list {
                        position: relative;

                        &::before {
                            content: '';
                            border-style: solid;
                            border-bottom: 15px solid $c-c;
                            border-top: 20px solid transparent;
                            border-left: 14px solid transparent;
                            border-right: 14px solid transparent;
                            position: absolute;
                            top: -45px;
                            right: 20px;
                        }

                        .list {
                            margin: 0;
                            padding: 0;
                            list-style-type: none;
                            color: $c-3;
                            font-weight: 600;

                            .list-item {
                                margin: 10px;
                                border-radius: 5px;
                                padding: 8px;
                                cursor: pointer;
                                transition: .3s;

                                &:hover {
                                    background-color: $c-3;
                                    color: $c-green-theme;
                                }
                            }
                        }
                    }
                }
            }
            
            .username {
                margin: 0 15px;
                font-weight: bold;
                color: $c-d;
                transition: .3s;
                font-size: 14px;
                cursor: pointer;

                &:hover {
                    color: $c-green-theme;
                }

                @media #{$r-max-laptop-s} {
                    display: none;
                }
            }
        }

        .search_container_mobile {
            position: absolute;
            top: 12px;
            right: 6px;
        }

        .search-box {
            position: relative;
            height: 100%;
            width: auto;
            display: flex;
            align-items: center;

            //HIDE DESKTOP SEARCH UNDER 1024PX
            &.mobile-hide {
                @media #{$r-max-laptop-s} {
                    display: none;
                }
            }

            //DISPLAY DESKTOP SEARCH ABOVE 1024PX
            &.desktop-hide {
                @media #{$r-laptop-s} {
                    display: none;
                }
            }
            
            .search-form {
                position: absolute;
                top: 12px;
                right: 100%;

                @media #{$r-max-laptop-s} {
                    top: -5px;
                }

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

                    @media #{$r-max-laptop-s} {
                        height: 24px;
                        font-size: 13px;
                    }
                }

                .open_search {
                    width: 160px;

                    @media #{$r-max-laptop-s} {
                        width: 140px;
                    }
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
}

.sticky {
    @media #{$r-laptop-s} {
        background-color: rgba($c-dark-theme, 1);

        .wrapper-user {
            .nav-links {
                &-list {
                    .link {
                        &.submenu_user {
                            .sub-items {
                                background-color: rgba($c-dark-theme, 1) !important;
                            }
                        }
                    }
                }   
            }
        }
    }
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.scrollup-button {
    position: fixed;
    bottom: 150px;
    right: 15px;
    @include flexCenter();
    border-radius: 50%;
    background-color: $c-red;
    z-index: 10;
    cursor: pointer;
    box-shadow: 2px 6px 12px $c-6;
    transition: all .3s ease-in-out;

    @media #{$r-max-tablet} {
        display: none;
    }

    &:hover {
        transform: translateY(-6px);
    }

    i {
        font-size: 25px;
        color: $c-white;
        margin: 15px;
    }
}
</style>