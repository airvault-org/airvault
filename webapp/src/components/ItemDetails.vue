<template>
  <div id="item-details">
    <div>
      <label>Title</label>
      <p>{{ item.title }}</p>
    </div>

    <div>
      <label>Username</label>
      <p>{{ item.username }}</p>
    </div>

    <div>
      <label>Password</label>
      <p>{{ item.password }}</p>
    </div>

    <div>
      <label>Website</label>
      <p>{{ item.website }}</p>
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

</style>
