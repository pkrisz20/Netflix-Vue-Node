<template>
  <div id="app">
    <router-view :key="$route.path" />
  </div>
</template>

<script>
export default {
  name: "App",
  watch: {
    '$store.state.isLoggedIn': function() {
      if (!this.$store.state.isLoggedIn) {
        this.$router.push("/login").catch(()=>{});
      }
      else if (this.$store.state.isLoggedIn) {
        return;
      }
    },
    '$store.state.adminLoggedIn': function() {
      if (!this.$store.state.adminLoggedIn) {
        this.$router.push("/admin").catch(()=>{});
      }
      else if (this.$store.state.adminLoggedIn) {
        return;
      }
    },
  }
}
</script>

<style lang="scss">
#app {
  font-family: $c-main-font;
  margin: 0;
  padding: 0;
}

*, *::before, *::after {
  box-sizing: border-box;
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
