<template>
    <div>
        <agile
            :autoplay="true"
            :autoplaySpeed="4000"
            :pauseOnHover="false"
            :slidesToShow="1"
            :dots="true"
            :infinite="true">

            <div class="slide">
                <img alt="witcher" src="../../assets/images/witcher.jpg">
            </div>
            <div class="slide">
                <img alt="breaking" src="../../assets/images/peaky.jpg">
            </div>
            <div class="slide">
                <img alt="squid" src="../../assets/images/squid.png">
            </div>
            <div class="slide">
                <img alt="squid" src="../../assets/images/narcos.jpg">
            </div>
            <div class="slide">
                <img alt="squid" src="../../assets/images/mexico.jpg">
            </div>
        </agile>
    </div>
</template>

<script>
import { VueAgile } from 'vue-agile';

    export default {
        name: "Hero",
        components: {
            agile: VueAgile
        },
    }
</script>

<style lang="scss">

.agile {
    width: 100%;
    height: 100vh;

    .agile__list {
        .agile__track {
            .agile__slides {

                .slide {
                    width: 100%;
                    height: 100vh;
                    position: relative;

                    &::after {
                        position: absolute;
                        top: 0;
                        left: 0;
                        content: '';
                        width: 100%;
                        height: 100%;
                        background-color: rgba($c-black, 0.6);
                    }

                    img {
                        @include object-fit();
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }

    .agile__actions {

        .agile__nav-button {
            background: transparent;
            border: none;
            color: transparent;
            cursor: pointer;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;

            @media #{$r-max-mobile-l} {
                display: none;
            }

            &--prev {
                left: 20px;

                &::before {
                    position: absolute;
                    color: $c-white;
                    font-size: 40px;
                    width: 40px;
                    height: 40px;
                    top: 0;
                    left: 0;
                    font-family: "Font Awesome 5 Pro";
                    content: "\f053";
                }

                @media #{$r-max-tablet} {
                    left: 0;
                }
            }

            &--next {
                right: 20px;

                &::before {
                    position: absolute;
                    color: $c-white;
                    font-size: 40px;
                    width: 40px;
                    height: 40px;
                    top: 0;
                    right: 0;
                    font-family: "Font Awesome 5 Pro";
                    content: "\f054";
                }

                @media #{$r-max-tablet} {
                    right: 0;
                }
            }
        }

        .agile__dots {
            bottom: 15px;
            left: 50%;
            position: absolute;
            transform: translateX(-50%);

            .agile__dot {
                margin: 0 10px;

                button {
                    border-radius: 50%;
                    padding: 6px;
                    border: none;
                    background: $c-white;
                }

                &--current {

                    button {
                        background: $c-green-theme;
                    }
                }
            }
        }
    }
}
</style>