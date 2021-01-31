<template>
  <div class="home">
    <h1>This is user's dashboard page</h1>
    {{ items }}
  </div>
</template>

<script>
export default {
  computed: {
    items () {
      return this.$store.state.items
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
