import React, { createContext, useState } from 'react'

interface TimestampContextType {
  summary: string
  setSummary: (summary: string) => void
  text: string
  setText: (text: string) => void
  time: string
  setTime: (time: string) => void
}
export const TimestampContext = createContext({} as TimestampContextType)

export const TimestampProvider: React.FC = ({ children }) => {
  const [summary, setSummary] = useState('')
  const [text, setText] = useState('')
  const [time, setTime] = useState<string>('')

  return (
    <TimestampContext.Provider
      value={{ summary, setSummary, time, setTime, text, setText }}
    >
      {children}
    </TimestampContext.Provider>
  )
}
