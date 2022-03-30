import { Text, Button, Center, Heading, VStack } from '@chakra-ui/react'
import React from 'react'

const Popup = () => {
  const showForm = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'show-form' })
    })
  }
  return (
    <VStack py={6} bg="tomato">
      <Heading size="lg" mb={4}>
        Easy Youtube Timestamps
      </Heading>
      <Center mb={6}>
        <VStack>
          <Button onClick={showForm}>フォーム表示</Button>
          <Text>(うまく表示されない時に押してみてください)</Text>
        </VStack>
      </Center>
      <Heading size="xs">Developed by badpingpong</Heading>
    </VStack>
  )
}

export default Popup
