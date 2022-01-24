<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api';

export default {
  name: "App",
  components: {
    // defineComponent,
  }
}
</script>


<style lang="scss">

#app {
  font-family: 'Montserrat', sans-serif;
  background: $c-dark-theme;
}

body {
  overflow-x: hidden;
  padding: 0;
  margin: 0;
}

.wrapper {
  width: 1170px;
  height: 100%;
  padding: 0 15px;
  margin: 0 auto;
}
</style>
