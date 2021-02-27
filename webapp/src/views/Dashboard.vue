<template>
  <div class="home">

    <div class="panel">
      <div id="vault-summary-list">
        <ul>
          <li v-for="vault in vaults" :key="vault.id">
            <div class="vault-summary">
              <span class="vault-summary__title">{{vault.name}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="panel">
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
  </div>
</template>

<script>
export default {
  computed: {
    items () {
      return this.$store.getters.items
    },
    vaults () {
      return this.$store.getters.vaults
    },
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      await this.$store.dispatch('fetchVaults')
      await this.$store.dispatch('fetchItems')
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

.home {
  display: flex;
  flex-direction: row;
}

.panel {
  min-width: 400px;
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
