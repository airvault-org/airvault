<template>
  <div class="new-vault">
    <h1>New vault</h1>
    <form class="form" @submit="addNewVault">
      <div class="form__field">
        <label class="form__label" for="name">Vault name</label>
        <input class="form__input" type="text" id="name" name="name" v-model="vault.name" placeholder="Vault name">
      </div>
      <div class="form__field">
        <label class="form__label" for="description">Description (optional)</label>
        <textarea class="form__input" id="description" name="description" v-model="vault.description" placeholder="What should this vault be used for?"/>
      </div>
      <div class="form__field">
        <input class="form__submit" type="submit" value="Submit">
      </div>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      vault: {
        name: null,
        description: null,
      },
    }
  },

  methods: {
    async addNewVault(e) {
      e.preventDefault()
      if (this.vault.name && this.vault.name.length > 0) {
        await this.$store.dispatch('createVault', this.vault)
        this.$router.push('/items')
      }
    }
  }
}
</script>

<style scoped>

.new-vault {

}

label {
  display: block;
}
</style>
