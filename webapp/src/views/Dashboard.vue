<template>
  <div class="home">

    <div class="panel">
      <vault-link-list :vaults="vaults"/>
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
import VaultLinkList from "@/components/VaultLinkList";

export default {
  components: {
    ItemForm,
    ItemSummaryList,
    VaultLinkList,
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
