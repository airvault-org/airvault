<template>
  <div class="vault-link-list">
    <ul>
      <li v-for="vault in vaults" :key="vault.id">
        <div class="vault-summary">
          <span class="vault-summary__title">{{ vault.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['vaults'],
}
</script>

<style>

ul, li, ol {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.vault-summary-list {

}

.vault-summary {
  padding: 10px;
}

.vault-summary:hover {
  background-color: #F6F7FB;
}

.vault-summary__title {
  display: block;
  font-weight: 600;
}

</style>
