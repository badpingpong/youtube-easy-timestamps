import { Text, Button, Center, Heading, VStack, Image } from '@chakra-ui/react'
import React from 'react'
import logo from '../../assets/img/logo.svg'

const Popup = () => {
  const showForm = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'show-form' })
    })
  }
  return (
    <VStack py={6}>
      <Image src={logo} boxSize="100px" alt="logo" />
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
