<template>
  <div id="app">
    <nav id="nav">
      <div class="brand">
        <router-link to="/" class="brand__link">
          <img class="brand__logo" src="./assets/logo.png">
          <span class="brand__name">Airvault</span>
        </router-link>
      </div>
      <div class="links">
        <router-link to="/about" class="link">About</router-link>
        <router-link to="/login" class="link">Login</router-link>
        <router-link to="/register" class="link">Register</router-link>
      </div>
    </nav>
    <main id="page">
      <router-view/>
    </main>
  </div>
</template>

<style>

@import './assets/global.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 15px;
  background-color: #ffffff!important;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 1px solid #eaecef;
}

#nav a {
  font-weight: bold;
  color: inherit!important;
  display: flex;
  align-items: center;
  text-decoration: none;
}

#nav a:hover {
  text-decoration: underline;
}

#nav a.router-link-exact-active {
}

.brand {
  font-weight: 500;
}

.brand__link {

}

.brand__logo {
  width: 30px;
  margin-right: 10px;
}

.brand__name {
  font-size: 1.3rem;
}

.links {
  display: flex;
}

.link {
  display: inline-block;
  margin-left: 10px;
}

</style>
