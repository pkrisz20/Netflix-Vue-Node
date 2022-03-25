<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    // document.getElementById('app').addEventListener('touchstart', fn, detectIt.passiveEvents ? { passive:true } : false);
  }
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
