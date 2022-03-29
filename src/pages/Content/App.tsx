import React from 'react'
import { Button, ChakraProvider, Textarea } from '@chakra-ui/react'
import { TimeStampForm } from './TimeStampForm'

const App = () => {
  return (
    <ChakraProvider>
      <TimeStampForm />
      <Textarea bg="white" />
    </ChakraProvider>
  )
}

export default App
