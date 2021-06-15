<template>
  <div class="md-toolbar-row">
    <div class="md-toolbar-section-start">
      <router-link to="/"><h3 class="md-title">Airvault</h3></router-link>
    </div>
    <div v-if="isUserAuthenticated" class="md-toolbar-section-end">
      <button v-on:click="logout" class="md-button">Logout</button>
    </div>
    <div v-else class="md-toolbar-section-end">
      <md-button to="/login">Login</md-button>
      <md-button to="/register">Register</md-button>
    </div>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  computed: {
    isUserAuthenticated() {
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
</style>
