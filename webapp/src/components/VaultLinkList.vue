<template>
  <div class="vault-link-list">
    <ul>
      <li v-for="vault in vaults" :key="vault.id">
        <div class="vault-summary">
          <span class="vault-summary__title">{{ vault.name.charAt(0) }}</span>
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

.vault-link-list {
  background-color: whitesmoke;
  border-right: 1px solid lightgray;
}

.vault-summary {
  padding: 10px;
}

.vault-summary:hover {
  background-color: #F6F7FB;
}

.vault-summary__title {
  font-weight: 600;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  text-align: center;
  vertical-align: center;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: dimgrey;
  border-color: black;
  color: white;
}

</style>
