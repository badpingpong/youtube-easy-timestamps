import React from 'react'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { TimeStampForm } from './TimeStampForm'
import { TimestampProvider } from './TimestampContext'
import { TimestampsTextArea } from './TimestampsTextArea'

const App = () => {
  return (
    <ChakraProvider>
      <TimestampProvider>
        <Box py={2}>
          <TimeStampForm />
          <TimestampsTextArea />
        </Box>
      </TimestampProvider>
    </ChakraProvider>
  )
}

export default App
