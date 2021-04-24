<template>
  <div class="item-summary-list">
    <div class="search">
      <div class="search__input">
        <font-awesome-icon icon="search"/>
        <input autocapitalize="none" autocorrect="off" spellcheck="false" type="search" placeholder="Search" value="">
      </div>
      <button class="add__button" @click="addNewItem()">
        <font-awesome-icon icon="plus"/>
      </button>
    </div>
    <ul>
      <li v-for="item in items" :key="item.id">
        <div class="item-summary" @click="setCurrentItem(item)">
          <div class="item-summary__icon" alt="">
            <font-awesome-icon icon="id-card-alt"/>
          </div>
          <div class="item-summary__content">
            <span class="item-summary__title">{{ item.title }}</span>
            <span class="item-summary__username">{{ item.username }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['items'],

  methods: {
    addNewItem() {
      const newItem = {
        id: null,
        title: null,
        username: null,
        password: null,
        website: null,
        vaultId: '4161750d-4a1d-4e8e-9fe9-246c5ff2ac96'
      }
      this.$store.dispatch('setCurrentItem', newItem)
    },

    setCurrentItem(item) {
      this.$store.dispatch('setCurrentItem', item)
    }
  }
}
</script>

<style>

ul, li, ol {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.item-summary-list {
  min-width: 300px;
  width: 300px;
  border-right: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
}

.item-summary-list ul {
  background-color: white;
  overflow-y: auto;
}

.item-summary {
  padding: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.item-summary:hover {
  background-color: whitesmoke;
}

.item-summary__icon {
  width: 32px;
  height: 32px;
  border-radius: 5px;
  background-color: whitesmoke;
  border: 1px solid lightgrey;
  box-sizing: border-box;
  margin-right: 10px;
  color: darkgrey;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-summary__content {
  display: flex;
  flex-direction: column;
}

.item-summary__title {
  display: block;
  font-weight: 600;
}

.item-summary__username {
  display: block;
}

.search {
  border-bottom: 1px solid lightgrey;
  display: flex;
  justify-content: stretch;
  background-color: whitesmoke;
}

.search__input {
  border-radius: 20px;
  padding: 0 10px;
  box-sizing: border-box;
  margin: 10px;
  border: 1px solid lightgrey;
  background-color: white;
  display: flex;
  align-items: center;
  flex: 1;
}

.search__input > svg {
  color: lightgrey;
}

.search__input > input {
  border: none;
  outline-style: none;
  box-shadow: none;
  padding: 6px;
  line-height: 24px;
  background-color: transparent;
  flex: 1;
}

.search__input > input:focus {
  outline: none;
  outline-offset: -4px;
}

.add__button {
  border-radius: 50%;
  width: 38px;
  height: 38px;
  line-height: 38px;
  cursor: pointer;
  border: 1px solid lightgrey;
  margin: 10px 10px 10px 0;
}

</style>
