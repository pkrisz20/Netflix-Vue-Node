<template>
<div class="nav-user">
    <div class="wrapper-user">

        <div class="left-side">
            <div class="logo">
                <img alt="logo" class="logo-img" src="../../assets/images/netflix.png">
            </div>

            <div class="nav-links">
                <router-link class="link" to="/">Home</router-link>
                <Dropdown class="link submenu" :title="'Categories'" :items="movieCategories" @getSelected="writeOUTtype($event)"/>
                <router-link class="link" to="/mylist">My List</router-link>
                <router-link class="link" to="/favourites">My Favorites</router-link>
            </div>
        </div>

        <div class="user-box">

            <form class="search-form">
                <input ref="searchBox"
                    :class="{ open_search : openSearchBar }"
                    v-model="searchText"
                    @blur="openSearchBar = false; searchText = ''"
                    class="search-field"
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
            
            <!-- UPLOAD ICON -->
            <svg @click="openUploadForm" class="svg-upload" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.97 384.97"
            style="enable-background:new 0 0 384.97 384.97" xml:space="preserve">
            <path d="M372.939 264.641c-6.641 0-12.03 5.39-12.03 12.03v84.212H24.061v-84.212c0-6.641-5.39-12.03-12.03-12.03S0 270.031 0 276.671v96.242c0 
            6.641 5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03v-96.242c.001-6.652-5.389-12.03-12.03-12.03z"/>
            <path d="m117.067 103.507 63.46-62.558v235.71c0 6.641 5.438 12.03 12.151 12.03s12.151-5.39 12.151-12.03V40.95l63.46
            62.558c4.74 4.704 12.439 4.704 17.179 0 4.74-4.704 4.752-12.319 0-17.011L201.268 3.5c-4.692-4.656-12.584-4.608-17.191 0L99.888 86.496a11.942 11.942 0 0 0 0 17.011c4.74 4.704 12.439 4.704 17.179 0z"/>
            </svg>

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

            <!-- NOTIFICATION ICON -->
            <svg @click="openNotificationPanel" class="svg-notifications" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M427.68,351.43C402,320,383.87,304,383.87,217.35,383.87,138,343.35,109.73,310,96c-4.43-1.82-8.6-6-9.95-10.55C294.2,65.54,277.8,48,256,48S217.79,65.55,212,85.47c-1.35,4.6-5.52,8.71-9.95,10.53-33.39,13.75-73.87,41.92-73.87,121.35C128.13,304,110,320,84.32,351.43,73.68,364.45,83,384,101.61,384H410.49C429,384,438.26,364.39,427.68,351.43Z" style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
            <path d="M320,384v16a64,64,0,0,1-128,0V384" style="stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>

            <div class="notifications-panel" v-show="IsOpennotification">
                <div class="notifications">
                    <div class="not-row">
                        <p class="not-row-text">A new movie was added into the gallery.</p>
                        <p class="not-row-time">8 minutes ago</p>
                    </div>
                    <div class="not-row">
                        <p class="not-row-text">Jhon has commented to your post.</p>
                        <p class="not-row-time">16 minutes ago</p>
                    </div>
                </div>
            </div>

            <div class="user-box-pic">
                <img class="user-img" alt="user profile pic" src="../../assets/images/profile.jpg">

                <div class="user-options" v-show="isOpenOptions">
                    <div class="user-options-list">
                        <ul class="list">
                            <li class="list-item">Profile</li>
                            <li class="list-item" @click="logOut">Log Out</li>
                        </ul>
                    </div>
                </div>
            </div>
            <h5 class="username" @click="openUserOptions">pKrisz20</h5>
        </div>
    </div>
</div>
</template>

<script>
import Dropdown from '../Dropdown.vue';

    export default {
        name: "Header",
        components: {
            Dropdown,
        },
        data() {
            return {
                movieCategories: [
                    'Series',
                    'Movies',
                    'New & Popular'
                ],
                selectedType: null,
                openSearchBar: false,
                IsOpennotification: false,
                isOpenOptions: false,
                searchText: '',
            }
        },
        methods: {
            writeOUTtype(emitType) {
                this.selectedType = emitType;
                console.log(this.selectedType);
            },

            openUploadForm() {
                this.$emit("openUploadForm");
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
            },

            openNotificationPanel() {
                this.IsOpennotification = !this.IsOpennotification;
                this.isOpenOptions = false;
            },

            openUserOptions() {
                this.isOpenOptions = !this.isOpenOptions;
                this.IsOpennotification = false;
            },

            logOut() {
                this.$emit("logoutUser");
            }
        },
        mounted() {
            //close panels on click outside the elements
            document.addEventListener('click', (event) => {
                if (event.target.closest('.username')) return;
                if (event.target.closest('.svg-notifications')) return;
                if (event.target.closest('.user-options')) return;
                if (event.target.closest('.notifications-panel')) return;

                this.isOpenOptions = false;
                this.IsOpennotification = false;
            });
        }
    }
</script>

<style lang="scss">

.nav-user {
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 60px;
    transition: .4s;
    background-color: $c-dark-theme;

    .wrapper-user {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;

        .left-side {
            width: auto;
            height: 100%;
            display: flex;
            align-items: center;

            .logo {
                width: auto;
                height: 65%;
                
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
                    margin: 0 15px;
                    font-weight: bold;
                    color: $c-d;
                    text-decoration: none;
                    transition: .3s;
                    font-size: 14px;
                    cursor: pointer;

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

                        .sub-items {
                            background-color: $c-dark-theme;
                        }
                    }
                }
            }
        }

        .user-box {
            width: auto;
            height: 100%;
            display: flex;
            align-items: center;
            position: relative;

            .search-form {
                position: absolute;
                top: 12px;
                right: 300px;

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

            .svg-notifications {
                stroke: $c-white;
                fill: $c-dark-theme;
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
                position: fixed;
                top: 75px;
                right: 8px;
                width: 320px;
                height: 500px;
                background-color: $c-3;
                border-radius: 3px;

                .notifications {
                    position: relative;

                    &::before {
                        content: '';
                        border-style: solid;
                        border-bottom: 15px solid $c-3;
                        border-top: 20px solid transparent;
                        border-left: 14px solid transparent;
                        border-right: 14px solid transparent;
                        position: absolute;
                        top: -45px;
                        left: 140px;
                    }

                    .not-row {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        background-color: $c-c;
                        color: $c-3;
                        margin: 10px;
                        padding: 8px;
                        border-radius: 5px;

                        &-text {
                            margin: 0;
                            text-align: justify;
                            font-size: 16px;
                        }

                        &-time {
                            margin: 0;
                            font-weight: 600;
                            font-size: 13px;
                        }
                    }
                }
            }

            .user-options {
                position: fixed;
                top: 75px;
                right: 10px;
                width: 120px;
                height: auto;
                background-color: $c-3;
                border-radius: 3px;

                &-list {
                    position: relative;

                    &::before {
                        content: '';
                        border-style: solid;
                        border-bottom: 15px solid $c-3;
                        border-top: 20px solid transparent;
                        border-left: 14px solid transparent;
                        border-right: 14px solid transparent;
                        position: absolute;
                        top: -45px;
                        left: 20px;
                    }

                    .list {
                        margin: 0;
                        padding: 0;
                        list-style-type: none;
                        color: $c-c;

                        .list-item {
                            margin: 10px;
                            border-radius: 5px;
                            padding: 8px;
                            cursor: pointer;
                            transition: .3s;

                            &:hover {
                                background-color: $c-c;
                                color: $c-3;
                            }
                        }
                    }
                }
            }

            &-pic {
                width: 45px;
                height: 45px;

                .user-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    border-radius: 100%;
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
            }
        }
    }
}

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
    bottom: 50px;
    right: 50px;
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
</style>