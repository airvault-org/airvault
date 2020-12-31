$(document).ready(() => {

  const that = this;
  const views = ['login', 'main'];

  function setToken(token) {
    that.token = token;
  }

  async function loadMainView() {
    try {
      // 1. Fetch data
      const response = await fetch('http://localhost:3000/v1/vaults/1/items', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${that.token.access_token}`
        }
      });
      that.model = await response.json();
      if (that.model.data.length > 0) {
        selectItem(that.model.data[0].id);
      }

      // 2. Render view
      const $itemSummaryList = $('.item-summary-list');
      const $itemSummaryTemplate = $itemSummaryList.find('.item-summary');
      that.model.data.forEach((item) => {
        const $element = $itemSummaryTemplate.clone();
        $element.attr('data-id', item.id);
        $element.find('.item-summary__website').text(item.website);
        $element.find('.item-summary__username').text(item.username);
        $element.appendTo($itemSummaryList);
      });
      $itemSummaryTemplate.remove();

      // 3. Bind events
      $('.item-summary').click(event => {
        selectItem(event.currentTarget.dataset.id);
      });

    } catch (err) {
      console.error(err);
    }
  }

  function renderSelectedItem() {
    const $itemDetails = $('.item-details');
    $itemDetails.find('.item-details__title').text('__title__');
    $itemDetails.find('.item-details__username > .item-details__field-value').text(that.selectedItem.username);
    $itemDetails.find('.item-details__password > .item-details__field-value').text(that.selectedItem.password);
    $itemDetails.find('.item-details__website > .item-details__field-value').text(that.selectedItem.website);
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

  function selectItem(itemId) {
    that.selectedItem = that.model.data.filter((item) => item.id === itemId)[0];
    renderSelectedItem();
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
  })


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

