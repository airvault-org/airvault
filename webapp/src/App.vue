<template>
  <div id="app">
    <NavBar/>
    <main id="page">
      <router-view/>
    </main>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  components: { NavBar }
}
</script>

<style>
@import './assets/main.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
