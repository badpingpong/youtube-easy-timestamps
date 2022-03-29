import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import logo from '../../assets/img/logo.svg'

const Popup = () => {
  const showForm = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'show-form' })
    })
  }
  return (
    <Box>
      <Button onClick={showForm}>フォーム表示</Button>
    </Box>
  )
}

export default Popup
