import React from 'react'
import { Button, FormControl, HStack, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { StampIcon } from './icons/StampIcon'
import { convertSecondsToHHMMSS } from './helpers/timeConverters'
import { useContext } from 'react'
import { TimestampContext } from './TimestampContext'
import { useEffect } from 'react'

interface FormInputs {
  label: string
}
export const TimestampForm = () => {
  const { text, setText, textareaRef } = useContext(TimestampContext)
  const { register, handleSubmit, watch, reset } = useForm<FormInputs>()

  useEffect(() => {
    window.addEventListener('onControlBarStampClick', onSubmit)
    return () => window.removeEventListener('onControlBarStampClick', onSubmit)
  }, [text])

  const getCurrentTime = () => {
    const video = document.querySelector('video')
    return video ? convertSecondsToHHMMSS(video.currentTime) : ''
  }

  const submit = () => {
    const textToAppend = `${getCurrentTime()} ${watch('label')}`
    setText(`${text}\n${textToAppend}`)
    reset({ label: '' })
    if (textareaRef.current)
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight
  }

  const onSubmit = () => {
    handleSubmit(submit)()
  }

  const onKeyPressInInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      // e.preventDefault()
      handleSubmit(submit)()
    }
  }

  return (
    <FormControl onSubmit={onSubmit} onKeyPress={onKeyPressInInput}>
      <HStack spacing={2}>
        <Input
          id="title"
          size="lg"
          {...register('label')}
          bg={'white'}
          variant="flushed"
          placeholder={
            '見出しを入力してEnterで挿入(未入力でタイムスタンプだけを挿入)'
          }
          paddingInlineStart={4}
        />
        <Button size="lg" aria-label="Stamp" onClick={onSubmit}>
          <StampIcon />
        </Button>
      </HStack>
    </FormControl>
  )
}