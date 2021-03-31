<template>
  <div class="item-details" v-if="item">

    <div class="item-fields">
      <div class="item-field">
        <span class="item-field__label">title:</span>
<!--        <input class="item-field__value" v-model="item.title" placeholder="title">-->
        <span class="item-field__value">{{ item.title }}</span>
      </div>

      <div class="item-field">
        <span class="item-field__label">username:</span>
<!--        <input class="item-field__value" v-model="item.username" placeholder="username">-->
        <span class="item-field__value">{{ item.username }}</span>
      </div>

      <div class="item-field">
        <span class="item-field__label">password:</span>
<!--        <input class="item-field__value" v-model="item.password" placeholder="password">-->
        <span class="item-field__value">{{ item.password }}</span>
      </div>

      <div class="item-field">
        <span class="item-field__label">website:</span>
<!--        <input class="item-field__value" v-model="item.website" placeholder="website">-->
        <span class="item-field__value">{{ item.website }}</span>
      </div>

      <div class="item-actions">
        <button class="item-actions__save" @click="saveItem">Save</button>
        <button class="item-actions__delete" @click="deleteItem">Delete</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    saveItem() {

    },

    deleteItem() {
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
