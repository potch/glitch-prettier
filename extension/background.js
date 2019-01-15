
browser.browserAction.onClicked.addListener(function (message) {
  browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
    let activeTab = tabs[0];
    browser.tabs.sendMessage(activeTab.id, {
      action: "format"
    });
  })
});