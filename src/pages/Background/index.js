console.log('バックグラウンド')
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // read changeInfo data and do something with it (like read the url)
  console.log('aho', changeInfo)
  if (changeInfo.url) {
    // do something here
    console.log('url changed!!!!!!!!')
    chrome.tabs.sendMessage(tabId, {
      type: 'url-changed',
      newUrl: changeInfo.url,
    })
  }
})
