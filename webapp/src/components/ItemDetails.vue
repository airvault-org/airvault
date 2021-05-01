<template>
  <div class="item-details">

    <div class="item-actions">
      <button class="item-actions__save" @click="saveItem">Save</button>
      <button class="item-actions__delete" @click="deleteItem">Delete</button>
    </div>

    <div class="item-fields">
      <div class="item-field">
        <label class="item-field__label" for="item-title">Title</label>
        <input class="item-field__value" name="item-title" id="item-title" v-model="editedItem.title" >
      </div>

      <div class="item-field">
        <label class="item-field__label" for="item-username">Username</label>
        <input class="item-field__value" name="item-username" id="item-username" v-model="editedItem.username">
      </div>

      <div class="item-field">
        <label class="item-field__label" for="item-password">Password</label>
        <input class="item-field__value" name="item-password" id="item-password" v-model="editedItem.password">
      </div>

      <div class="item-field">
        <label class="item-field__label" for="item-website">Website</label>
        <input class="item-field__value" name="item-website" id="item-website" v-model="editedItem.website" placeholder="N/A">
      </div>

      <div class="item-field">
        <label class="item-field__label">Vault</label>
        <select class="item-field__select" name="vault-id" id="vault-id" v-model="editedItem.vault_id"  >
          <option v-for="vault in vaults" :value="vault.id" :key="vault.id">
            {{ vault.name }}
          </option>
        </select>
      </div>

      <div class="item-field metadata">
        <div v-if="editedItem.created">
          Created at <span class="item-field__date">{{new Date(editedItem.created).toLocaleString()}}</span>
        </div>
        <div v-if="editedItem.updated">
          Updated at <span class="item-field__date">{{new Date(editedItem.updated).toLocaleString()}}</span>
        </div>
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
          created: null,
          updated: null,
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
        created: this.item.created,
        updated: this.item.updated,
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
  display: flex;
  flex-direction: column;
}

.item-actions {
  border-bottom: 1px solid lightgrey;
  display: flex;
  justify-content: stretch;
  background-color: #F6F5FA;
}

.item-actions > button {
  border-radius: 20px;
  min-width: 100px;
  height: 38px;
  cursor: pointer;
  border: 1px solid lightgrey;
  margin: 10px;
  background-color: white;
}
.item-actions > button:hover {
  border-color: #DB1F48;
  color: #DB1F48;
  background-color: white;
}

button.item-actions__save {
  background-color: #DB1F48 !important;
  border-color: #DB1F48 !important;
  color: white !important;
  font-weight: 500;
}

button.item-actions__delete {
  background-color: transparent;
}

.item-fields {
  padding: 20px;
  overflow: auto;
}

.item-field {
  margin-bottom: 24px;
}
.item-field:focus-within {
  color: #DB1F48;
}
.item-field.metadata {
  font-size: 0.85rem;
}

.item-field__label {
  display: block;
  font-weight: 500;
}

.item-field__date {
  color: #DB1F48;
}

.item-field__value {
  border: none;
  color: #5B7085;
  padding: 3px 0;
  font-size: 1rem;
  min-width: 380px;
  border-bottom: 1px solid lightgrey;
  outline: none;
}
.item-field__value:focus {
  border-bottom: 1px solid #DB1F48;
  color: #2c3e50;
}


</style>
