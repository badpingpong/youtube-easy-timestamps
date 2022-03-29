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

interface FormInputs {
  label: string
}
export const TimeStampForm = () => {
  const { register, handleSubmit, watch, reset } = useForm<FormInputs>()

  const getCurrentTime = () => {
    const video = document.querySelector('video')
    return video ? convertSecondsToHHMMSS(video.currentTime) : ''
  }

  const submit = () => {
    console.log(getCurrentTime(), watch('label'))
    reset({ label: '' })
  }

  const onKeyPressInInput = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        // e.preventDefault()
        handleSubmit(submit)()
      }
    },
    [handleSubmit]
  )

  return (
    <FormControl onSubmit={handleSubmit(submit)} onKeyPress={onKeyPressInInput}>
      <Input id="title" {...register('label')} bg={'white'} />
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
