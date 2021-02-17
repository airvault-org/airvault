<template>
  <div class="login">
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

<style>
.login {
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
  cursor: pointer;
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
</style>
