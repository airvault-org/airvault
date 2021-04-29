<template>
  <div class="item-details">

    <div class="item-actions">
      <button class="item-actions__save" @click="saveItem">Save</button>
      <button class="item-actions__delete" @click="deleteItem">Delete</button>
    </div>

    <div class="item-fields">
      <div class="item-field">
        <span class="item-field__label">title:</span>
        <input class="item-field__value" v-model="editedItem.title" placeholder="title">
      </div>

      <div class="item-field">
        <span class="item-field__label">username:</span>
        <input class="item-field__value" v-model="editedItem.username" placeholder="username">
      </div>

      <div class="item-field">
        <span class="item-field__label">password:</span>
        <input class="item-field__value" v-model="editedItem.password" placeholder="password">
      </div>

      <div class="item-field">
        <span class="item-field__label">website:</span>
        <input class="item-field__value" v-model="editedItem.website" placeholder="website">
      </div>

      <div class="item-field">
        <span class="item-field__label">vault:</span>
        <select class="item-field__select" name="vault-id" id="vault-id" v-model="editedItem.vault_id"  >
          <option v-for="vault in vaults" :value="vault.id" :key="vault.id">
            {{ vault.name }}
          </option>
        </select>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    vaults: Array,
    item: {
      type: Object,
      default() {
        return {
          id: null,
          title: '',
          username: '',
          password: '',
          website: '',
          vault_id: null,
        }
      }
    }
  },
  data() {
    return {
      editedItem: {
        id: this.item.id,
        title: this.item.title,
        username: this.item.username,
        password: this.item.password,
        website: this.item.website,
        vault_id: this.item.vault_id,
      },
    }
  },
  methods: {
    async saveItem(e) {
      e.preventDefault()
      if (this.editedItem.id) {
        await this.$store.dispatch('updateItem', this.editedItem)
      } else {
        await this.$store.dispatch('createItem', this.editedItem)
      }
      return this.$store.dispatch('setCurrentItem', this.editedItem)
    },

    deleteItem(e) {
      e.preventDefault()
      return this.$store.dispatch('deleteItem', this.item.id)
    }
  }
}
</script>

<style>

.item-details {
  flex: 1;
}

.item-actions {
  border-bottom: 1px solid lightgrey;
  display: flex;
  justify-content: stretch;
  background-color: whitesmoke;
}

.item-actions > button {
  border-radius: 20px;
  min-width: 100px;
  height: 38px;
  line-height: 38px;
  cursor: pointer;
  border: 1px solid lightgrey;
  margin: 10px;
}

button.item-actions__save {

}

button.item-actions__delete {
  background-color: dimgrey;
  border-color: black;
  color: white;
}

.item-fields {
}

.item-field__label {
  width: 100px;
  text-align: right;
  margin: 10px;
  display: inline-block;
  color: dimgrey;
}

.item-field__value {
  text-align: left;
}

</style>
