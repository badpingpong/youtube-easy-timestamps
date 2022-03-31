import React, { useEffect, useState } from 'react'
import { TimestampForm } from './TimestampForm'
import { TimestampProvider } from './TimestampContext'
import { TimestampsTextArea } from './TimestampsTextArea'
import { MenuBar } from './MenuBar'
import { Stack, ThemeProvider } from '@mui/material'
import { theme } from './styles/theme'

const App = () => {
  const [isVisible, setIsVisible] = useState(true)
  const showForms = () => setIsVisible(true)
  const hideForms = () => setIsVisible(false)

  useEffect(() => {
    window.addEventListener('onControlBarStampClick', showForms)
    return () => window.removeEventListener('onControlBarStampClick', showForms)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <TimestampProvider>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        {isVisible && (
          <Stack spacing={1}>
            <TimestampForm />
            <Stack spacing={1}>
              <TimestampsTextArea />
              <MenuBar closeForms={hideForms} />
            </Stack>
          </Stack>
        )}
      </TimestampProvider>
    </ThemeProvider>
  )
}

export default App
