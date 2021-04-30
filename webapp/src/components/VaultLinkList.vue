<template>
  <div class="vault-link-list">
    <ul>
      <li>
        <div class="vault-summary">
          <span class="vault-summary__title"
                @click="setCurrentVault(null)"
                title="All"
                :class="{ active: !currentVaultId }">
            All
          </span>
        </div>
      </li>
      <li v-for="vault in vaults" :key="vault.id">
        <div class="vault-summary">
          <span class="vault-summary__title"
                @click="setCurrentVault(vault)"
                :title="vault.name"
                :class="{ active: vault.id === currentVaultId }">
            {{ vault.name.charAt(0) }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['vaults'],

  computed: {
    currentVaultId() {
      if (this.$store.getters.currentVault) {
        return this.$store.getters.currentVault.id
      }
      return null
    }
  },

  methods: {
    async setCurrentVault(vault) {
      const currentItem = this.$store.getters.currentItem
      let updateCurrentItemRequired = false
      if (vault) {
        if (currentItem.vault_id !== vault.id) {
          updateCurrentItemRequired = true
        }
      }
      await this.$store.dispatch('setCurrentVault', vault)
      await this.$store.dispatch('fetchItems', vault)

      if (updateCurrentItemRequired) {
        const items = this.$store.getters.items
        if (items && items.length > 0) {
          await this.$store.dispatch('setCurrentItem', items[0])
        }
      }
    }
  },
}
</script>

<style>

ul, li, ol {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.vault-link-list {
  background-color: whitesmoke;
  border-right: 1px solid lightgray;
}

.vault-summary {
  padding: 10px;
}

.vault-summary:hover {
  background-color: #F6F7FB;
}

.vault-summary__title {
  font-weight: 600;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  text-align: center;
  vertical-align: center;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgrey;
}
.vault-summary__title.active {
  background-color: dimgrey;
  color: white;
  border-color: black;
}
</style>
