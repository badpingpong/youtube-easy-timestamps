import React from 'react'
import { useForm } from 'react-hook-form'
import { StampIcon } from './icons/StampIcon'
import { convertSecondsToHHMMSS } from './helpers/timeConverters'
import { useContext } from 'react'
import { TimestampContext } from './TimestampContext'
import { useEffect } from 'react'
import { FormGroup, IconButton, Input, Stack, Tooltip } from '@mui/material'

interface FormInputs {
  label: string
}
const addTimestampTooltipText = chrome.i18n.getMessage(
  'ext_add_timestamp_tooltip'
)
const labelPlaceholderText = chrome.i18n.getMessage('ext_label_placeholder')

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
    setText(text ? `${text}\n${textToAppend}` : `${textToAppend}`)
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
    <FormGroup onSubmit={onSubmit} onKeyPress={onKeyPressInInput}>
      <Stack direction="row" spacing={2}>
        <Input
          id="title"
          {...register('label')}
          value={watch('label')}
          fullWidth
          placeholder={labelPlaceholderText}
        />
        <Tooltip title={addTimestampTooltipText}>
          <IconButton color="primary">
            <StampIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </FormGroup>
  )
}
