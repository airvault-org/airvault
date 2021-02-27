<template>
  <div class="item-summary-list">
    <div class="">
      <div class="search">
        <div class="search__input">
          <font-awesome-icon icon="search"/>
          <input autocapitalize="none" autocorrect="off" spellcheck="false" type="search" placeholder="Search" value="">
        </div>
        <button class="add__button">
          <font-awesome-icon icon="plus"/>
        </button>
      </div>
    </div>
    <ul>
      <li v-for="item in items" :key="item.id">
        <div class="item-summary">
          <div class="item-summary__icon" alt="" />
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
}
</script>

<style>

ul, li, ol {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.item-summary-list {
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
  display: inline-block;
  box-sizing: border-box;
  margin-right: 10px;
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
