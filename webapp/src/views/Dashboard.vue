<template>
  <div class="home">
    <div id="item-summary-list">
      <ul>
        <li v-for="item in items" :key="item.id">
          <div class="item-summary">
            <span class="item-summary__title">{{item.title}}</span>
            <span class="item-summary__username">{{item.username}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    items () {
      return this.$store.getters.items
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      return this.$store.dispatch('fetchItems')
    }
  }
}
</script>

<style scoped>
ul, li, ol {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.item-summary-list {

}

.item-summary {
  padding: 10px;
}

.item-summary:hover {
  background-color: #F6F7FB;
}

.item-summary__title {
  display: block;
  font-weight: 600;
}
.item-summary__username {
  display: block;
}

</style>
