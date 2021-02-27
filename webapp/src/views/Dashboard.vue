<template>
  <div class="home">

    <div class="panel">
      <div id="vault-summary-list">
        <ul>
          <li v-for="vault in vaults" :key="vault.id">
            <div class="vault-summary">
              <span class="vault-summary__title">{{ vault.name }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="panel">
      <item-summary-list :items="items"/>
    </div>

    <div class="panel">
      <item-form/>
    </div>
  </div>
</template>

<script>
import ItemForm from "@/components/ItemForm";
import ItemSummaryList from "@/components/ItemSummaryList";

export default {
  components: {
    ItemForm,
    ItemSummaryList,
  },
  computed: {
    items() {
      return this.$store.getters.items
    },
    vaults() {
      return this.$store.getters.vaults
    },
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      Promise.all([
        this.$store.dispatch('fetchVaults'),
        this.$store.dispatch('fetchItems'),
      ]);
    },
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

</style>
