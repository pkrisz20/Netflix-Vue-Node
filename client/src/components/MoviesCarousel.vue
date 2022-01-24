<template>
    <div>
        <carousel
                :paginationEnabled="false"
                :navigationEnabled="true"
                :navigationPrevLabel="arrowLeft"
                :navigationNextLabel="arrowRight"
                :perPageCustom="[[320, 1], [768, 3], [1200, 5]]"
                :navigationClickTargetSize="20"
                :perPage="1">
            <slide>
                <img alt="moneyHeist" src="../assets/images/moneyHEIST.jpg">
            </slide>
            <slide>
                <img alt="moneyHeist" src="../assets/images/witcher.jpg">
            </slide>
            <slide>
                <img alt="moneyHeist" src="../assets/images/breaking.jpg">
            </slide>
            <slide>
                <img alt="moneyHeist" src="../assets/images/walkingdead.jpg">
            </slide>
            <slide>
                <img alt="moneyHeist" src="../assets/images/queens.jpg">
            </slide>
            <slide>
                <img alt="moneyHeist" src="../assets/images/squid.png">
            </slide>
        </carousel>
    </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

    export default {
        name: "ProductsCarousel",
        data() {
            return {
                arrowRight: '<i class="fas fa-chevron-right"></i>',
                arrowLeft: '<i class="fas fa-chevron-left"></i>'
            }
        },
        components: {
            Carousel,
            Slide
        },
    }
</script>

<style lang="scss">
.VueCarousel {
    margin: 0 auto;
    width: 90%;
    height: auto;

    .VueCarousel-wrapper {

        .VueCarousel-inner {

            .VueCarousel-slide {
                width: 100%;
                height: 100%;

                img {
                    object-position: center;
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    .VueCarousel-navigation{
        .VueCarousel-navigation-button {
            border-radius: 5px;
            padding: 10px !important;
            
            &.VueCarousel-navigation-next {
                margin-right: -10px !important;
            }

            &.VueCarousel-navigation-prev {
                margin-left: -10px !important;
            }

            &.VueCarousel-navigation--disabled {
                display: none !important;
            }

            i {
                font-size: 35px;
                color: $c-e;
            }
        }
    }
}
</style>