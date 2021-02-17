<template>
  <div class="register">
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
.register {
  margin: 60px auto 60px;
  min-width: 450px;
  width: 450px;
  border-radius: 12px;
  box-shadow: 0 0 0 rgb(0 0 0 / 10%), 0 4px 16px rgb(0 0 0 / 6%), 0 8px 40px rgb(0 0 0 / 10%);
  background-color: white;
  padding: 40px 60px;
}

.form {
}

.form__field {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.form__label {
  display: block;
  font-weight: 500;
  color: #333333;
  margin-bottom: 5px;
}

.form__input {
  min-height: 30px;
  color: #333333;
  line-height: 1.2em;
  font-size: 1rem;
  border-radius: 6px;
  padding: 10px 14px;
  background-color: white;
  outline: none;
  resize: none;
  appearance: none;
  border: none;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 25%);
}

.form__input:focus {
  box-shadow: inset 0 0 0 1px #0572ec;
}

.form__submit {
  display: block;
  width: 100%;
  color: white;
  background-color: #0572ec;
  box-shadow: inset 0 0 0 1px #1060d1;
  min-height: 50px;
  font-weight: 600;
  line-height: 1.5em;
  border-radius: 24px;
  border: 0;
  padding: 8px 16px;
  outline: none;
  resize: none;
  transition: all 0.25s ease;
  margin-top: 30px;
  margin-bottom: 30px;
}

.form__submit:focus,
.form__submit:hover {
  background-color: #1060d1;
}

#terms-and-conditions {
  color: #0000008c !important;
  font-weight: 400 !important;
  margin: 0;
}
</style>

