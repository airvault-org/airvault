<template>
  <div>
    <form novalidate class="md-layout md-alignment-center-center" @submit.prevent="login">
      <md-card class="md-layout-item md-size-30 md-small-size-100">
        <md-card-header>
          <div class="md-title">Sign in with your account</div>
        </md-card-header>

        <md-card-content>
          <md-field>
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.username" :disabled="sending"/>
          </md-field>
          <md-field>
            <label for="password">Password</label>
            <md-input type="password" name="password" id="password" autocomplete="off" v-model="form.password" :disabled="sending"/>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending"/>

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Log in</md-button>
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
        username: null,
        password: null,
      },
      sending: false
    }
  },
  methods: {
    async login() {
      if (this.form.username && this.form.password) {
        await api.authenticate({
          username: this.form.username,
          password: this.form.password,
        })
        this.$router.push('/items')
      }
    }
  },
}
</script>
