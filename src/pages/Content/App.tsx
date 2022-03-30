import React, { useEffect, useState } from 'react'
import { ChakraProvider, VStack } from '@chakra-ui/react'
import { TimestampForm } from './TimestampForm'
import { TimestampProvider } from './TimestampContext'
import { TimestampsTextArea } from './TimestampsTextArea'
import { MenuBar } from './MenuBar'

const App = () => {
  const [isVisible, setIsVisible] = useState(true)
  const showForms = () => setIsVisible(true)
  const hideForms = () => setIsVisible(false)

  useEffect(() => {
    window.addEventListener('onControlBarStampClick', showForms)
    return () => window.removeEventListener('onControlBarStampClick', showForms)
  }, [])

  return (
    <ChakraProvider>
      <TimestampProvider>
        {isVisible && (
          <VStack py={2} spacing={2}>
            <TimestampForm />
            <VStack w="100%">
              <TimestampsTextArea />
              <MenuBar closeForms={hideForms} />
            </VStack>
          </VStack>
        )}
      </TimestampProvider>
    </ChakraProvider>
  )
}

export default App
