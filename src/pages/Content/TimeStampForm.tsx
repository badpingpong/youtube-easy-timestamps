import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { StampIcon } from './icons/StampIcon'
import { convertSecondsToHHMMSS } from './helpers/timeConverters'
import { useContext } from 'react'
import { TimestampContext } from './TimestampContext'
import { useEffect } from 'react'
import {
  FormGroup,
  IconButton,
  Input,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from '@mui/material'
import { Box } from '@mui/system'

interface FormInputs {
  label: string
}
const addTimestampTooltipText = chrome.i18n.getMessage(
  'ext_add_timestamp_tooltip'
)
const labelPlaceholderText = chrome.i18n.getMessage('ext_label_placeholder')
const offsetTooltipText = chrome.i18n.getMessage('ext_offset_tooltip')
const secondUnit = chrome.i18n.getMessage('ext_second')
export const TimestampForm = () => {
  const { text, setText, textareaRef } = useContext(TimestampContext)
  const { register, handleSubmit, watch, reset } = useForm<FormInputs>()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    window.addEventListener('onControlBarStampClick', onSubmit)
    return () => window.removeEventListener('onControlBarStampClick', onSubmit)
  }, [text])

  const getCurrentTime = () => {
    const video = document.querySelector('video')
    return video ? convertSecondsToHHMMSS(video.currentTime - offset) : ''
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

  const changeOffset = (event: any, newOffset: number) => {
    newOffset !== null && setOffset(newOffset)
  }

  return (
    <FormGroup onSubmit={onSubmit} onKeyPress={onKeyPressInInput}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Input
          id="title"
          {...register('label')}
          value={watch('label')}
          fullWidth
          placeholder={labelPlaceholderText}
        />
        <Tooltip title={offsetTooltipText} followCursor>
          <ToggleButtonGroup
            size="small"
            color="primary"
            value={offset}
            exclusive
            defaultValue={0}
            onChange={changeOffset}
          >
            <ToggleButton value={30}>-30{secondUnit}</ToggleButton>
            <ToggleButton value={20}>-20{secondUnit}</ToggleButton>
            <ToggleButton value={10}>-10{secondUnit}</ToggleButton>
            <ToggleButton value={0} defaultChecked>
              ±0{secondUnit}
            </ToggleButton>
          </ToggleButtonGroup>
        </Tooltip>
        <Tooltip title={addTimestampTooltipText}>
          <IconButton color="primary" onClick={handleSubmit(submit)}>
            <StampIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </FormGroup>
  )
}
