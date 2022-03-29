import { printLine } from './modules/print'
import React from 'react'
import ReactDOM from 'react-dom'
// import { TimeStampForm } from './TimeStampForm'
import App from './App'

printLine("Using the 'printLine' function from the Print Module")

const TIMESTAMP_FORM_ID = 'timestamp-form'
const CONTAINER_ID = 'primary-inner'
const TARGET_ID_OF_INSERT_BEFORE = 'div#info.style-scope.ytd-watch-flexy'

const form = document.createElement('div')
form.setAttribute('id', TIMESTAMP_FORM_ID)

const showTimestampForm = () => {
  const container = document.getElementById(CONTAINER_ID)
  const reference = document.querySelector(TARGET_ID_OF_INSERT_BEFORE)
  container.insertBefore(form, reference)
}
const video = document.querySelector('video')
video.onloadedmetadata = () => {
  console.log('動画読み込まれた！', document.getElementById('primary-inner'))
  setTimeout(() => showTimestampForm(), 500)
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'show-form') {
    !document.querySelector(TIMESTAMP_FORM_ID) && showTimestampForm()
  }
})

ReactDOM.render(<App />, form)
