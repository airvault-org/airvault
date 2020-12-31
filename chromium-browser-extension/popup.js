$(document).ready(() => {

  const that = this;
  const views = ['login', 'main'];

  function setToken(token) {
    that.token = token;
  }

  async function fetchVaults() {
    try {
      const response = await fetch('http://localhost:3000/v1/vaults', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${that.token.access_token}`
        }
      });
      const payload = await response.json();
      return payload.data;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async function fetchVaultItems(vaultId) {
    try {
      const response = await fetch(`http://localhost:3000/v1/vaults/${vaultId}/items`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${that.token.access_token}`
        }
      });
      const payload = await response.json();
      return payload.data;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async function data() {
    const model = {
      vaults: [],
      selectedVault: null,
      items: [],
      selectedItem: null,
    };

    model.vaults = await fetchVaults();
    if (model.vaults.length > 0) {
      model.selectedVault = model.vaults[0];

      model.items = await fetchVaultItems(model.selectedVault.id);
      if (model.items.length > 0) {
        model.selectedItem = model.items[0];
      }
    }

    return model;
  }

  function renderVaultListPanel() {
    const $vaultList = $('.vault-list');
    const $vaultTemplate = $vaultList.find('.vault');
    that.model.vaults.forEach((vault) => {
      const $element = $vaultTemplate.clone();
      $element.attr('data-id', vault.id);
      $element.find('.vault__name').text(vault.name);
      $element.appendTo($vaultList);
    });
    $vaultTemplate.remove();
  }

  function renderItemSummaryListPanel() {
    const $itemSummaryList = $('.item-summary-list');
    const $itemSummaryTemplate = $itemSummaryList.find('.item-summary');
    that.model.items.forEach((item) => {
      const $element = $itemSummaryTemplate.clone();
      $element.attr('data-id', item.id);
      $element.find('.item-summary__title').text(item.title);
      $element.find('.item-summary__username').text(item.username);
      $element.appendTo($itemSummaryList);
    });
    $itemSummaryTemplate.remove();
  }

  function renderItemDetailsPanel() {
    const selectedItem = that.model.selectedItem;
    const $itemDetails = $('.item-details');
    $itemDetails.find('.item-details__title').text(selectedItem.title);
    $itemDetails.find('.item-details__username > .item-details__field-value').text(selectedItem.username);
    $itemDetails.find('.item-details__password > .item-details__field-value').text(selectedItem.password);
    $itemDetails.find('.item-details__website > .item-details__field-value').text(selectedItem.website);
  }

  async function loadMainView() {
    try {
      // 1. Fetch data
      that.model = await data();

      // 2. Render view
//      renderVaultListPanel();
      renderItemSummaryListPanel();
      renderItemDetailsPanel();

      // 3. Bind events
      $('.vault').click(event => {
        selectVault(event.currentTarget.dataset.id);
      });
      $('.item-summary').click(event => {
        selectItem(event.currentTarget.dataset.id);
      });

    } catch (err) {
      console.error(err);
    }
  }

  function setActiveView(viewName) {
    if (views.includes(viewName)) {
      $('.view').hide();
      $(`#${viewName}-view`).show();
      if (viewName === 'main') {
        return loadMainView();
      }
    } else {
      console.error(`View not found: '${viewName}'`);
    }
  }

  function selectVault(vaultId) {
    that.model.electedVault = that.model.vaults.filter((vault) => vault.id === vaultId)[0];
  }

  function selectItem(itemId) {
    that.model.selectedItem = that.model.items.filter((item) => item.id === itemId)[0];
    renderItemDetailsPanel();
  }

  $('#login-form').submit(async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: new URLSearchParams({
          'username': 'admin',
          'password': 'admin',
          'grant_type': 'password',
          'client_id': 'passwords-webapp'
        })
      });
      if (response.ok) {
        const token = await response.json();
        setToken(token);
        chrome.storage.local.set({ 'authenticated': token }, () => {
          setActiveView('main');
        });
      }
    } catch (err) {
      console.error(err);
    }
  });

  $('.open-website').click((event) => {
    chrome.tabs.create({ active: true, url: that.model.selectedItem.website });
  });

  function main() {

    chrome.storage.local.get('authenticated', function(data) {
      if (data.authenticated) {
        setToken(data.authenticated);
        setActiveView('main');
      } else {
        setActiveView('login');
      }
    });
  }

  main();

});

