<template>
  <div class="item-tabs">
    <ul>
      <li class="tab active"><div class="tab-header">Item 1 <button class="tab-close-button"><font-awesome-icon icon="times"/></button></div></li>
      <li class="tab"><div class="tab-header">Item 2 <button class="tab-close-button"><font-awesome-icon icon="times"/></button></div></li>
      <li class="tab"><div class="tab-header">Item 3 <button class="tab-close-button"><font-awesome-icon icon="times"/></button></div></li>
      <li class="tab"><div class="tab-header">Item 4 <button class="tab-close-button"><font-awesome-icon icon="times"/></button></div></li>
      <li class="tab"><div class="tab-header">Item 5 <button class="tab-close-button"><font-awesome-icon icon="times"/></button></div></li>
      <li class="tab"><div class="tab-header">Item 6 <button class="tab-close-button"><font-awesome-icon icon="times"/></button></div></li>
      <li class="tab"><div class="tab-header">Item 7 <button class="tab-close-button"><font-awesome-icon icon="times"/></button></div></li>
      <li class="tab"><div class="tab-header">Item 8 <button class="tab-close-button"><font-awesome-icon icon="times"/></button></div></li>
      <li class="tab"><div class="tab-header">Item 9 <button class="tab-close-button"><font-awesome-icon icon="times"/></button></div></li>
      <li class="tab"><div class="tab-header">Item 10 <button class="tab-close-button"><font-awesome-icon icon="times"/></button></div></li>
      <li class="tab"><div class="tab-header">Item 11 <button class="tab-close-button"><font-awesome-icon icon="times"/></button></div></li>
      <li class="tab"><div class="tab-header">Item 12 <button class="tab-close-button"><font-awesome-icon icon="times"/></button></div></li>
      <li class="tab"><div class="tab-header">Item 13 <button class="tab-close-button"><font-awesome-icon icon="times"/></button></div></li>
      <li class="tab"><div class="tab-header">Item 14 <button class="tab-close-button"><font-awesome-icon icon="times"/></button></div></li>
      <li class="tab"><div class="tab-header">Item 15 <button class="tab-close-button"><font-awesome-icon icon="times"/></button></div></li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

.item-tabs {
  height: 60px;
  display: block;
}

ul {
  padding: 10px 10px 0 10px;
  border-bottom: 1px solid lightgrey;
  background-color: whitesmoke;
  display: flex;
  overflow-x: auto;
}

li {
  list-style-type: none;
  border: 1px solid lightgrey;
  margin: 0 2px -1px;
  z-index: 1;
  padding: 13px 8px 12px;
  background-color: white;
  cursor: pointer;
  width: 160px;
  min-width: 60px;
}

li button {
  display: none;
  font-size: 0.8rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
}


li.active {
  border-bottom-color: white;
  border-top: 3px solid darkgrey;
  padding-top: 11px;
  cursor: default;
}

li:hover button,
li.active button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.tab-header {
  position: relative;
}

.tab-close-button {
  position: absolute;
  right: 2px;
  top: 1px;
}
</style>
