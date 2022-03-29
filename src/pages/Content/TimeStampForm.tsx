import React from 'react'
import {
  FormControl,
  IconButton,
  Input,
  InputRightElement,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { StampIcon } from './StampIcon'
import { convertSecondsToHHMMSS } from './helpers/timeConverters'
import { useContext } from 'react'
import { TimestampContext } from './TimestampContext'

interface FormInputs {
  label: string
}
export const TimeStampForm = () => {
  const { text, setText } = useContext(TimestampContext)
  const { register, handleSubmit, watch, reset } = useForm<FormInputs>()

  const getCurrentTime = () => {
    const video = document.querySelector('video')
    return video ? convertSecondsToHHMMSS(video.currentTime) : ''
  }

  const submit = () => {
    const textToAppend = `${getCurrentTime()} ${watch('label')}`
    setText(`${text}\n${textToAppend}`)
    reset({ label: '' })
  }

  const onKeyPressInInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      // e.preventDefault()
      handleSubmit(submit)()
    }
  }

  return (
    <FormControl onSubmit={handleSubmit(submit)} onKeyPress={onKeyPressInInput}>
      <Input
        id="title"
        {...register('label')}
        bg={'white'}
        placeholder={
          '見出しを入力してEnterで挿入(未入力でタイムスタンプだけを挿入)'
        }
      />
      <InputRightElement>
        <IconButton
          aria-label="Stamp"
          onClick={handleSubmit(submit)}
          icon={<StampIcon />}
        />
      </InputRightElement>
    </FormControl>
  )
}
