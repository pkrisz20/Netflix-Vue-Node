<template>
    <div class="searchDetailes">

        <button class="searchDetailes-togglebutton"
            @click="toggleSearchBox"
            :class="{ opened : openSearchBox }">
            {{ openSearchBox ? 'Close' : 'Detailed search' }}
            <i class="fas fa-angle-down"></i>
        </button>

        <transition name="slide">
            <div class="search_box" v-if="openSearchBox">

                <div class="search_box--container">
                    <div class="category" v-for="(item, index) in $store.state.categories" :key="index">
                        <input type="checkbox" :id="item" :value="item" v-model="$store.state.filteredCategories" />
                        <label :for="item">{{ item }}</label>
                    </div>
                </div>

                <div class="release">
                    <div class="release_toggle">
                        <input id="toggle" class="release_toggle-btn" type="checkbox" @change="toggleDateFilter" />
                        <label for="toggle">Search by release date</label>
                    </div>

                    <div class="release_params">
                        <label for="from" :class="{ enable : !dateDisabled }">From:</label>
                        <input
                            :disabled="dateDisabled"
                            id="from"
                            type="number"
                            class="release_params-input"
                            v-model="$store.state.filterFromYear"
                        />

                        <label for="to" :class="{ enable : !dateDisabled }">To:</label>
                        <input
                            :disabled="dateDisabled"
                            id="to"
                            type="number"
                            class="release_params-input"
                            v-model="$store.state.filterToYear"
                        />
                    </div>
                </div>

                <button class="search_box--submit" @click="executeFiltering">GO</button>
                <!-- <div>{{filteringCategories}}</div> -->
            </div>
        </transition>

        <!-- <div>Filtered categories: {{ filteringCategories }}</div> -->
    </div>
</template>

<script>
// import { mapGetters } from "vuex";

    export default {
        name: "SearchDetails",
        data() {
            return {
                openSearchBox: false,
                dateDisabled: true,
            }
        },
        methods: {
            executeFiltering() {
                //execute filtering from vuex getters
            },
            toggleSearchBox() {
                this.openSearchBox = !this.openSearchBox;
                this.dateDisabled = true;
                this.$store.state.filterToYear = null;
                this.$store.state.filterFromYear = null;
            },

            toggleDateFilter() {
                this.dateDisabled = !this.dateDisabled;
                this.$store.state.filterToYear = null;
                this.$store.state.filterFromYear = null;
            }
        },
    }
</script>

<style lang="scss" scoped>
.searchDetailes {

    @media #{$r-max-laptop-s} {
        @include flexCenter();
        flex-direction: column;
    }

    &-togglebutton {
        @include flexCenter();
        background-color: $c-green-theme;
        border: none;
        width: 230px;
        height: 48px;
        border-radius: 3px;
        cursor: pointer;
        color: $c-white;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 12px;
        font-weight: 900;
        transition: all .3s ease-in-out;
        position: relative;

        i {
            position: absolute;
            top: 14px;
            right: 15px;
            transition: transform .3s ease;
            font-size: 20px;
        }
    }

    .opened {
        background-color: $c-error;

        i {
            transform: rotate(180deg);
        }
    }

    .search_box {
        background-color: $c-dark-theme;
        border-radius: 5px;
        width: 300px;
        padding: 15px;
        height: auto;

        @media #{$r-max-mobile-s} {
            width: 250px;
            text-align: center;
        }
        
        &--container {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, auto);
            row-gap: 10px;
            column-gap: 10px;

            @media #{$r-max-mobile-s} {
                display: flex;
                flex-direction: column;
                column-gap: 0;
            }

            .category {
                width: 100%;
                display: flex;
                align-items: center;

                label {
                    color: $c-d;
                    margin-left: 5px;
                    cursor: pointer;
                }

                input[type="checkbox"] {
                    cursor: pointer;
                    position: relative;
                    width: 30px;
                    height: 15px;
                    background: $c-a;
                    outline: none;
                    -webkit-appearance: none;
                    border-radius: 15px;
                    box-shadow: inset 0 0 5px rgba($c-black, 0.2);
                    transition: .3s;

                    &:checked {
                        background: $c-green-theme;
                    }

                    &::before {
                        position: absolute;
                        content: '';
                        width: 15px;
                        height: 15px;
                        border-radius: 50%;
                        top: 0;
                        left: 0;
                        background: $c-white;
                        transform: scale(1.1);
                        box-shadow: 0 2px 5px rgba($c-black, 0.2);
                        transition: .3s;
                    }

                    &:checked::before {
                        left: 15px;
                    }
                }
            }
        }

        .release {
            margin: 25px 0 15px;
            display: flex;
            flex-direction: column;
            align-items: center;

            &_toggle {
                @include flexCenter();
                width: 100%;
                margin-bottom: 10px;

                label {
                    color: $c-d;
                    margin-left: 5px;
                    cursor: pointer;
                }

                &-btn {
                    cursor: pointer;
                    position: relative;
                    width: 30px;
                    height: 15px;
                    background: $c-a;
                    outline: none;
                    -webkit-appearance: none;
                    border-radius: 15px;
                    box-shadow: inset 0 0 5px rgba($c-black, 0.2);
                    transition: .3s;

                    &:checked {
                        background: $c-green-theme;
                    }

                    &::before {
                        position: absolute;
                        content: '';
                        width: 15px;
                        height: 15px;
                        border-radius: 50%;
                        top: 0;
                        left: 0;
                        background: $c-white;
                        transform: scale(1.1);
                        box-shadow: 0 2px 5px rgba($c-black, 0.2);
                        transition: .3s;
                    }

                    &:checked::before {
                        left: 15px;
                    }
                }
            }

            &_params {
                @include flexCenter();
                width: 100%;

                label {
                    color: $c-d;
                    margin: 0 6px;
                    opacity: 0.3;
                }

                .enable {
                    opacity: 1;
                }

                &-input {
                    width: 75px;
                    height: 25px;
                    border-radius: 3px;
                    outline: none;
                    border: none;
                    color: $c-black;
                    font-weight: 600;
                }
            }
        }

        &--submit {
            margin-top: 20px;
            background-color: $c-green-theme;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            color: $c-white;
            font-size: 14px;
            font-weight: 600;
            padding: 10px 30px;
            transition: all .3s ease-in-out;

            &:hover {
                background-color: $c-success;
            }
        }
    }
}

.slide-enter-active {
    -moz-transition-duration: 0.3s;
    -webkit-transition-duration: 0.3s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -moz-transition-timing-function: ease-in;
    -webkit-transition-timing-function: ease-in;
    -o-transition-timing-function: ease-in;
    transition-timing-function: ease-in;
}

.slide-leave-active {
    -moz-transition-duration: 0.3s;
    -webkit-transition-duration: 0.3s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
    max-height: 340px;
    overflow: hidden;
}

.slide-enter, .slide-leave-to {
    overflow: hidden;
    max-height: 0;
}
</style>