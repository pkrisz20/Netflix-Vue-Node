<template>
  <div class="home">
    <Header />
    <Hero />
    <Commercial />
    <BlockTitle :title="'All categories'"/>
    <MovieList :movies=$store.state.list />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/guest/Header.vue';
import Commercial from "@/components/guest/Commercial.vue";
import BlockTitle from "@/components/global/BlockTitle.vue";
import Hero from "@/components/guest/Hero.vue";
import MovieList from "@/components/global/MovieList.vue";
import Footer from "@/components/global/Footer.vue";

export default {
  name: "Home",
  components: {
    Header,
    Hero,
    MovieList,
    BlockTitle,
    Footer,
    Commercial
  },
  mounted() {
      this.$store.dispatch('getAllMovies');
  },
};
</script>

<style lang="scss">
.home {
  padding: 0;
  margin: 0;
  position: relative;
  z-index: 0;

  .block_title {
    background-color: $c-dark-theme;
    margin-bottom: 0;
    padding-bottom: 40px;
  }
}
</style>