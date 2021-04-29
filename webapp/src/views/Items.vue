<template>
  <div class="items">

    <!--
    <div class="menu">
      <div class="menu-section">
        <ul>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="th"/>
              <span>All items</span>
            </button>
          </li>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="star"/>
              <span>Favorites</span></button>
          </li>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="trash"/>
              <span>Trash</span>
            </button>
          </li>
        </ul>
      </div>
      <div class="menu-section">
        <span class="menu-section__title">Vaults</span>
        <ul>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="archive"/>
              <span>Personal</span>
            </button>
          </li>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="archive"/>
              <span>Shared</span>
            </button>
          </li>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="archive"/>
              <span>Company</span>
            </button>
          </li>
        </ul>
      </div>
      <div class="menu-section">
        <span class="menu-section__title">Categories</span>
        <ul>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="id-card-alt"/>
              <span>Login</span></button>
          </li>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="sticky-note"/>
              <span>Secure Note</span>
            </button>
          </li>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="credit-card"/>
              <span>Credit Card</span>
            </button>
          </li>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="id-card"/>
              <span>Identity</span>
            </button>
          </li>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="key"/>
              <span>Password</span>
            </button>
          </li>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="database"/>
              <span>Database</span>
            </button>
          </li>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="server"/>
              <span>Server</span>
            </button>
          </li>
        </ul>
      </div>
      <div class="menu__section">
        <span class="menu-section__title">tags</span>
        <ul>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="tag"/>
              <span>Admin</span>
            </button>
          </li>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="tag"/>
              <span>Football</span>
            </button>
          </li>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="tag"/>
              <span>Internet</span>
            </button>
          </li>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="tag"/>
              <span>Pro</span>
            </button>
          </li>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="tag"/>
              <span>Server</span>
            </button>
          </li>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="tag"/>
              <span>Sport</span>
            </button>
          </li>
          <li>
            <button class="menu-section__button">
              <font-awesome-icon icon="tag"/>
              <span>Work</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
    -->

    <vault-link-list :vaults="vaults"/>

    <item-summary-list :items="items"/>

    <div class="item-content">
      <item-details :vaults="vaults" v-if="selectedItem" :item="selectedItem" :key="selectedItemKey"/>
    </div>

  </div>
</template>

<script>
import ItemSummaryList from "@/components/ItemSummaryList";
import ItemDetails from "@/components/ItemDetails";
import VaultLinkList from "@/components/VaultLinkList";

export default {
  components: {
    VaultLinkList,
    ItemDetails,
    ItemSummaryList,
  },
  computed: {
    items() {
      return this.$store.getters.items
    },
    vaults() {
      return this.$store.getters.vaults
    },
    selectedItem() {
      return this.$store.getters.currentItem
    },
    selectedItemKey() {
      return (this.selectedItem && this.selectedItem.id) ? this.selectedItem.id : Date.now()
    }
  },
  async created() {
    await this.fetchData()
    if (this.items && this.items.length > 0) {
      await this.$store.dispatch('setCurrentItem', this.items[0])
    }
  },
  methods: {
    fetchData() {
      return Promise.all([
        this.$store.dispatch('fetchVaults'),
        this.$store.dispatch('fetchItems'),
      ]);
    },
  }
}
</script>

<style scoped>
.items {
  position: relative;
  flex: 1;
  display: flex;
  align-items: stretch;
  background-color: white;
  max-width: 100vw;
}

.menu {
  min-width: 260px;
  width: 260px;
  border-right: 1px solid lightgrey;
  padding: 10px 0;
  background: whitesmoke;
  overflow-y: auto;
}

.menu-section {
  margin-bottom: 20px;
}

.menu-section li {
  width: 100%;
}

.menu-section__button {
  margin-left: 15px;
  padding: 6px 0;
  border: none;
  cursor: pointer;
  background: transparent;
  text-align: left;
  font-size: 0.95rem;
  color: dimgrey;
}

.menu-section__button:focus,
.menu-section__button:hover {
  color: black;
}

.menu-section__button > span {
  margin-left: 6px;
}

.menu-section__title {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.7rem;
  margin-left: 15px;
  color: black;
}

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

</style>
