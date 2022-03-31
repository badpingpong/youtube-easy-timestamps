import {
  Text,
  Box,
  Button,
  Center,
  Heading,
  VStack,
  Image,
} from '@chakra-ui/react'
import React from 'react'
import logo from '../../assets/img/logo.svg'

const HINT_TEXT = chrome.i18n.getMessage('ext_popup_hint')
const SHOW_FORMS_TEXT = chrome.i18n.getMessage('ext_show_form_at_popup')
const Popup = () => {
  const showForm = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'show-form' })
    })
  }
  return (
    <VStack pt={3} spacing={5} h="100vh">
      <VStack>
        <Image src={logo} boxSize="60px" alt="logo" />
        <Heading size="lg" mb={4}>
          Easy Youtube Timestamps
        </Heading>
      </VStack>
      <Center mb={6}>
        <VStack>
          <Button onClick={showForm}>{SHOW_FORMS_TEXT}</Button>
          <Text>({HINT_TEXT})</Text>
        </VStack>
      </Center>
      <Heading size="xs">Developed by badpingpong</Heading>
    </VStack>
  )
}

export default Popup
