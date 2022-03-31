import { printLine } from './modules/print'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ControlBarTimestampButton } from './ControlBarTimestampButton'
import { emitControlBarStampClickEvent } from './helpers/customEvent'

printLine("Using the 'printLine' function from the Print Module")

const TIMESTAMP_FORM_ID = 'timestamp-form'
const CONTAINER_ID = 'primary-inner'
const TARGET_ID_OF_INSERT_AFTER = 'div#player.style-scope.ytd-watch-flexy'

const form = document.createElement('div')
form.setAttribute('id', TIMESTAMP_FORM_ID)

const timestampButton = document.createElement('div')
timestampButton.setAttribute('id', 'timestamp-button')
timestampButton.setAttribute('class', 'ytp-button')
timestampButton.onclick = emitControlBarStampClickEvent

// window.onload = () => {
//   setTimeout(() => {
//     // ChakraUIの影響かロゴが正しく表示されなかったのでサイズを変更して本来の表示に近づける
//     const youtubeLogo = document.querySelector('.style-scope.ytd-logo')
//     youtubeLogo.style.width = '120px'
//     youtubeLogo.style.height = '56px'
//   }, 1000)
// }

const showTimestampForm = () => {
  const container = document.getElementById(CONTAINER_ID)
  const reference = document.querySelector(TARGET_ID_OF_INSERT_AFTER)
  container.insertBefore(form, reference.nextSibling)
}

const showTimestampButton = () => {
  const parent = document.querySelector('div.ytp-left-controls')
  const reference = document.querySelector('button.ytp-play-button')
  parent.insertBefore(timestampButton, reference.nextSibling)
}

const video = document.querySelector('video')
video.onloadedmetadata = () => {
  setTimeout(() => showTimestampForm(), 1000)
  // setTimeout(() => showTimestampButton(), 1000)
  showTimestampButton()
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'show-form') {
    !document.querySelector(TIMESTAMP_FORM_ID) && showTimestampForm()
  }
})

ReactDOM.render(<App />, form)
ReactDOM.render(<ControlBarTimestampButton />, timestampButton)
