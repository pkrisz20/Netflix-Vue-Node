<template>
  <div class="home">
    <Header />
    <Hero />
    <MovieList />
    <MoviesCarousel />
  </div>
</template>

<script>
import Header from '../../components/Header.vue';
import Hero from "../../components/Hero.vue";
import MovieList from "../../components/MovieList.vue";
import MoviesCarousel from "../../components/MoviesCarousel.vue";

export default {
  name: "Home",
  components: {
    Header,
    Hero,
    MoviesCarousel,
    MovieList,
  },
};
</script>
