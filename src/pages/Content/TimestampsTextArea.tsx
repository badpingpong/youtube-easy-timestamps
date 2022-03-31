import { TextareaAutosize } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { TimestampContext } from './TimestampContext'

interface FormType {
  text: string
}
export const TimestampsTextArea: React.FC = () => {
  const { register } = useForm<FormType>()
  const { text, setText, textareaRef } = useContext(TimestampContext)

  const onChange = (e: any) => {
    const newText = e.target.value
    setText(newText)
  }

  return (
    <TextareaAutosize
      {...register('text')}
      ref={textareaRef}
      maxRows={6}
      value={text}
      onChange={onChange}
    />
  )
}
