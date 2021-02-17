<template>
  <div class="register rounded-panel">
    <h1>Create an account</h1>
    <form class="form" @submit="signUp">
      <div class="form__field">
        <label class="form__label" for="name">Your name</label>
        <input class="form__input" v-model="name" autocapitalize="words" autocomplete="name" autocorrect="off" id="name"
               maxlength="60" spellcheck="false" type="text">
      </div>
      <div class="form__field">
        <label class="form__label" for="username">Your username</label>
        <input class="form__input" v-model="username" autocapitalize="none" autocomplete="username" autocorrect="off"
               id="username" maxlength="60" spellcheck="false" type="text">
      </div>
      <div class="form__field">
        <label class="form__label" for="email">Your email address</label>
        <input class="form__input" v-model="email" autocapitalize="none" autocomplete="email" autocorrect="off" id="email"
               maxlength="255" spellcheck="false" type="email">
      </div>
      <div class="form__field">
        <label class="form__label" for="password">Your password</label>
        <input class="form__input" v-model="password" autocapitalize="none" autocomplete="new-password" autocorrect="off"
               id="password" maxlength="60" spellcheck="false" type="password">
      </div>
      <input class="form__submit" type="submit" value="Submit">
      <p id="terms-and-conditions">By proceeding, you agree to the <a target="_blank" href="/legal/terms-of-service">Terms
        of Service</a> and <a target="_blank" href="/legal/privacy">Privacy Notice</a>.</p>
    </form>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      name: null,
      username: null,
      email: null,
      password: null
    }
  },
  methods: {
    async signUp(e) {
      e.preventDefault();
      if (this.name && this.username && this.email && this.password) {
        await api.register({
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password,
        })
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style>
#terms-and-conditions {
  color: #0000008c !important;
  font-weight: 400 !important;
  margin: 0;
}
</style>

