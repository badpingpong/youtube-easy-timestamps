import React from 'react'
import EmailIcon from '@mui/icons-material/Email'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useContext } from 'react'
import { TimestampContext } from './TimestampContext'
import { QUOTATION_INFO_TEXT } from './constants/constants'
import { UnavailableFeatureTooltip } from './UnavailableFeatureTooltip'
import { IconButton, Stack, Tooltip } from '@mui/material'

interface Props {
  closeForms: () => void
}

const copyTooltipText = chrome.i18n.getMessage('ext_copy_tooltip')
const clearTextareaTooltipText = chrome.i18n.getMessage(
  'ext_clear_textarea_tooltip'
)
const hideFormsTooltipText = chrome.i18n.getMessage('ext_hide_forms_tooltip')

export const MenuBar: React.FC<Props> = ({ closeForms }) => {
  const { text, setText, clearText } = useContext(TimestampContext)
  const clearTimestamps = async () =>
    (await confirm('入力内容をリセットします')) && clearText()

  const copyToClipboard = async () => {
    const textToCopy = `${text}\n\n${QUOTATION_INFO_TEXT}`
    navigator.clipboard.writeText(textToCopy)
  }

  return (
    <Stack
      direction="row"
      width="100%"
      height="40px"
      justifyContent="space-between"
    >
      <Stack direction="row">
        <Tooltip title={copyTooltipText}>
          <IconButton onClick={copyToClipboard} color="primary">
            <ContentPasteIcon sx={{ fontSize: '24px' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title={clearTextareaTooltipText}>
          <IconButton onClick={clearTimestamps} color="error">
            <DeleteForeverIcon sx={{ fontSize: '24px' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title={hideFormsTooltipText}>
          <IconButton onClick={closeForms} color="info">
            <VisibilityIcon sx={{ fontSize: '24px' }} />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack direction="row">
        <UnavailableFeatureTooltip>
          <IconButton disabled>
            <EmailIcon sx={{ fontSize: '24px' }} />
          </IconButton>
        </UnavailableFeatureTooltip>
        <UnavailableFeatureTooltip>
          <IconButton disabled>
            <HelpOutlineIcon sx={{ fontSize: '24px' }} />
          </IconButton>
        </UnavailableFeatureTooltip>
      </Stack>
    </Stack>
  )
}
