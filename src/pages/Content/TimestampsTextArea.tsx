import { Textarea } from '@chakra-ui/react'
import React from 'react'
import { useContext } from 'react'
import { TimestampContext } from './TimestampContext'

export const TimestampsTextArea: React.FC = () => {
  const { text } = useContext(TimestampContext)
  return <Textarea value={text} bg="white"></Textarea>
}
