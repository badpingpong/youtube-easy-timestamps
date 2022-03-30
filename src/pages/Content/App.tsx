import React from 'react'
import { ChakraProvider, VStack } from '@chakra-ui/react'
import { TimestampForm } from './TimestampForm'
import { TimestampProvider } from './TimestampContext'
import { TimestampsTextArea } from './TimestampsTextArea'
import { MenuBar } from './MenuBar'

const App = () => {
  return (
    <ChakraProvider>
      <TimestampProvider>
        <VStack py={2} spacing={2}>
          <TimestampForm />
          <VStack w="100%">
            <TimestampsTextArea />
            <MenuBar />
          </VStack>
        </VStack>
      </TimestampProvider>
    </ChakraProvider>
  )
}

export default App
