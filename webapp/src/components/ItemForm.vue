<template>
  <div id="item-form">
    <form class="form" @submit="saveItem">
      <div class="form__field">
        <label class="form__label" for="title">Title</label>
        <input class="form__input" v-model="title" id="title" type="text">
      </div>
      <div class="form__field">
        <label class="form__label" for="username">Username</label>
        <input class="form__input" v-model="username" id="username" type="text">
      </div>
      <div class="form__field">
        <label class="form__label" for="password">Password</label>
        <input class="form__input" v-model="password" id="password" type="text">
      </div>
      <div class="form__field">
        <label class="form__label" for="website">Website</label>
        <input class="form__input" v-model="website" id="website" type="text">
      </div>
      <input class="form__submit" type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      title: null,
      username: null,
      password: null,
      website: null,
    }
  },
  methods: {
    async saveItem(e) {
      e.preventDefault()
      const item = {
        title: this.title,
        username: this.username,
        password: this.password,
        website: this.website,
        vaultId: '5e8c9850-6498-45dd-ab75-5e85976789b7',
      }
      return this.$store.dispatch('createItem', item)
    }
  }
}
</script>

<style>

</style>
