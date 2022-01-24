<template>
    <div @click="menuOpen = !menuOpen">
        {{ title }}
        <i class="fas fa-sort-down"></i>

        <transition name="fade" appear>
            <div v-if="menuOpen" class="sub-items">
                <div v-for="(item, i) in items" :key="i" class="sub-row">
                    <a class="sub-link" @click="sendSlectedItem(item)">{{ item }}</a>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Dropdown",
        props: ['title', 'items'],
        data() {
            return {
                menuOpen: false,
            }
        },
        methods: {
            sendSlectedItem(item) {
                this.$emit("getSelected", item);
            }
        },
        mounted() {
            document.addEventListener('click', (event) => {
                if (event.target.closest('.submenu')) return;
                this.menuOpen = false;
            });
        },
    }
</script>

<style lang="scss" scoped>

    .sub-items {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: calc(100% + 15px);
        left: 0;
        width: max-content;
        border-radius: 0 0 5px 5px;
        transition: .4s;

        .sub-row {
            margin: 5px 0;
            padding: 8px;

            .sub-link {
                font-weight: bold;
                color: $c-d;
                text-decoration: none;
                transition: .3s;
                cursor: pointer;

                &:hover {
                    color: $c-green-theme;
                }
            }
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all .3s ease-in-out;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>