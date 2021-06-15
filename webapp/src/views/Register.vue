<template>
  <div>
    <form novalidate class="md-layout md-alignment-center-center" @submit.prevent="signUp">
      <md-card class="md-layout-item md-size-30 md-small-size-100">
        <md-card-header>
          <div class="md-title">Create an account</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
            </div>
          </div>
          <md-field>
            <label for="name">Your name</label>
            <md-input type="text" name="text" id="name" autocomplete="name" v-model="form.name" />
          </md-field>
          <md-field>
            <label for="username">Your username</label>
            <md-input type="text" name="text" id="username" autocomplete="username" v-model="form.username" />
          </md-field>
          <md-field>
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email"/>
          </md-field>
          <md-field>
            <label for="password">Your password</label>
            <md-input type="password" name="password" id="password" autocapitalize="none" autocomplete="new-password" autocorrect="off" v-model="form.password" />
          </md-field>

        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-raised md-primary">Create account</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>

</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      form: {
        name: null,
        username: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    async signUp() {
      if (this.form.name && this.form.username && this.form.email && this.form.password) {
        await api.register({
          name: this.form.name,
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
        })
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style>
</style>

