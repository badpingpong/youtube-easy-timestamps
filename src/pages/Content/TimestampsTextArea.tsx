import { Textarea } from '@chakra-ui/react'
import React from 'react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { TimestampContext } from './TimestampContext'

interface FormType {
  text: string
}
export const TimestampsTextArea: React.FC = () => {
  const { watch, reset, register } = useForm<FormType>()
  const { text, setText, textareaRef } = useContext(TimestampContext)

  const onChange = (e: any) => {
    const newText = e.target.value
    setText(newText)
  }

  return (
    <Textarea
      {...register('text')}
      ref={textareaRef}
      value={text}
      bg="white"
      onChange={onChange}
    ></Textarea>
  )
}
