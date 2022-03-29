import { printLine } from './modules/print'

console.log('Content script works!')
console.log('Must reload extension for modifications to take effect.')

printLine("Using the 'printLine' function from the Print Module")

const TIMESTAMP_FORM_ID = 'timestamp-form'
const APPEND_TARGET_ID = 'player'

const showTimestampForm = () => {
  const newElement = document.createElement('div')
  newElement.innerHTML = 'フォーム'
  newElement.setAttribute('id', TIMESTAMP_FORM_ID)
  document.getElementById(APPEND_TARGET_ID).appendChild(newElement)
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension'
  )
  if (request.type === 'show-form') {
    if (document.getElementById(TIMESTAMP_FORM_ID)) {
      sendResponse({ farewell: 'no! already exists' })
      console.log('a?')
    } else {
      showTimestampForm()
      sendResponse({ farewell: 'ok' })
      console.log('a!')
    }
  }
})
