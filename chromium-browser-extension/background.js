/*
chrome.storage.local.clear(function() {
  const error = chrome.runtime.lastError;
  if (error) {
    console.error(error);
  }
});

chrome.storage.local.get('authenticated', function(data) {
  if (!data.authenticated) {
    chrome.browserAction.setPopup({ popup: 'popup_sign_in.html' });
  } else {
    chrome.browserAction.setPopup({ popup: 'popup.html' });
  }
});
*/

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.clear(function() {
    const error = chrome.runtime.lastError;
    if (error) {
      console.error(error);
    }
  });
});

