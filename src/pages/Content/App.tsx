import React, { useEffect } from 'react'
import { ChakraProvider, VStack } from '@chakra-ui/react'
import { TimestampForm } from './TimestampForm'
import { TimestampProvider } from './TimestampContext'
import { TimestampsTextArea } from './TimestampsTextArea'

const App = () => {
  return (
    <ChakraProvider>
      <TimestampProvider>
        <VStack py={2} spacing={2}>
          <TimestampForm />
          <TimestampsTextArea />
        </VStack>
      </TimestampProvider>
    </ChakraProvider>
  )
}

export default App
