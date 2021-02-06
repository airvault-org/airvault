<template>
  <div class="login">
    <h1>This is the login page</h1>
    <form @submit="login">
      <div>
        <label for="username">Username:</label><br>
        <input v-model="username" type="text" name="username" id="username">
      </div>
      <div>
        <label for="password">Password:</label><br>
        <input v-model="password" type="password" name="password" id="password">
      </div>
      <div>
        <input type="submit" value="Submit">
      </div>
    </form>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    async login(e) {
      e.preventDefault();
      if (this.username && this.password) {
        await api.authenticate({
          username: this.username,
          password: this.password,
        })
        this.$router.push('/dashboard')
      }
    }
  }
}
</script>
