<template>
  <div id="app">
    <router-view :key="$route.path" />
  </div>
</template>

<script>
export default {
  name: "App",
}
</script>

<style lang="scss">
#app {
  font-family: $c-main-font;
  margin: 0;
  padding: 0;
}

body {
  overflow-x: hidden;
  padding: 0;
  margin: 0;

  .wrapper {
    width: 1170px;
    height: 100%;
    padding: 0 15px;
    margin: 0 auto;
  }
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  border-radius: 20px;
  background: $c-a;
}

::-webkit-scrollbar-thumb {
  background-color: $c-green-theme;
  border-radius: 20px;
}
</style>
