<template>
  <nav id="nav">
    <div class="brand">
      <router-link to="/" class="brand__link">
        <span class="brand__name">Airvault</span>
      </router-link>
    </div>
    <div class="links">
      <router-link to="/" class="link">Documentation</router-link>
      <router-link to="/" class="link">Community</router-link>
      <div class="links links--authenticated" v-if="isUserAuthenticated">
        <router-link to="/items" class="link">Items</router-link>
        <button v-on:click="logout" class="link">Logout</button>
      </div>
      <div class="links links--unauthenticated" v-else>
        <router-link to="/login" class="link">Login</router-link>
        <router-link to="/register" class="link">Register</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import api from '../services/api'

export default {
  computed: {
    isUserAuthenticated () {
      return this.$store.getters.isUserAuthenticated
    }
  },
  methods: {
    async logout() {
      await api.invalidate()
      if (this.$route.meta.requiresAuth) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>
#nav {
  padding: 15px;
  background-color: #ffffff !important;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 1px solid #eaecef;
  box-shadow: 0 0 0 1px rgb(63 63 68 / 5%), 0 1px 3px 0 rgb(63 63 68 / 15%);
  z-index: 9999;
}

.brand {
  font-weight: 500;
}

.brand__link {
  text-decoration: none!important;
  color: inherit!important;
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
  margin-left: 20px;
  outline: none;
  border: none;
  background-color: inherit;
  font-weight: bold;
  color: inherit !important;
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  font-size: 1rem;
}

.link:focus,
.link:hover {
  text-decoration: underline;
}

</style>
