<template>
  <div class="item-details" v-if="item">

    <div class="item-actions">
      <button>Delete</button>
    </div>

    <div class="item-fields">
      <div class="item-field">
        <span class="item-field__label">title:</span>
        <span class="item-field__value">{{ item.title }}</span>
      </div>

      <div class="item-field">
        <span class="item-field__label">username:</span>
        <span class="item-field__value">{{ item.username }}</span>
      </div>

      <div class="item-field">
        <span class="item-field__label">password:</span>
        <span class="item-field__value">{{ item.password }}</span>
      </div>

      <div class="item-field">
        <span class="item-field__label">website:</span>
        <span class="item-field__value">{{ item.website }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
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
  border-radius: 50%;
  width: 38px;
  height: 38px;
  line-height: 38px;
  cursor: pointer;
  border: 1px solid lightgrey;
  margin: 10px;
}

.item-fields {
  padding: 20px;
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
