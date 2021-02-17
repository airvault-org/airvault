<template>
  <div class="login rounded-panel">
    <h1>Sign in with your account</h1>
    <form class="form" @submit="login">
      <div class="form__field">
        <label class="form__label" for="email">Email</label>
        <input class="form__input" v-model="username" id="email" type="email">
      </div>
      <div class="form__field">
        <label class="form__label" for="password">Password</label>
        <input class="form__input" v-model="password" id="password" type="password">
      </div>
      <input class="form__submit" type="submit" value="Submit">
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
