import React, { createContext, useEffect, useRef, useState } from 'react'
import { getKeyOfYoutube } from './helpers/getKeyOfYoutube'

interface TimestampContextType {
  currentUrl: string
  summary: string
  setSummary: (summary: string) => void
  text: string
  setText: (text: string) => void
  time: string
  setTime: (time: string) => void
  textareaRef: React.MutableRefObject<HTMLTextAreaElement | null>
  clearText: () => void
  loadText: () => void
}
export const TimestampContext = createContext({} as TimestampContextType)

export const TimestampProvider: React.FC = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState(document.location.href)
  const key = getKeyOfYoutube(currentUrl)
  const [summary, setSummary] = useState('')
  const [text, setText] = useState('')
  const [time, setTime] = useState<string>('')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.type === 'url-changed') {
      setCurrentUrl(request.newUrl)
      sendResponse({ farewell: 'Dealt with new url' })
    }
  })

  useEffect(() => {
    setText('')
    loadText()
  }, [currentUrl])

  const loadText = () => {
    key &&
      chrome.storage.sync.get([key], (result) => {
        setText(result[key])
      })
  }

  const clearText = () => {
    setText('')
    key && chrome.storage.sync.set({ [key]: '' })
  }

  const saveText = (text: string) => {
    key && chrome.storage.sync.set({ [key]: text })
  }

  useEffect(() => {
    text && saveText(text)
  }, [text])

  return (
    <TimestampContext.Provider
      value={{
        currentUrl,
        summary,
        setSummary,
        time,
        setTime,
        text,
        setText,
        textareaRef,
        clearText,
        loadText,
      }}
    >
      {children}
    </TimestampContext.Provider>
  )
}
