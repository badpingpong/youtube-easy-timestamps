import { HStack, IconButton, Tooltip, useToast } from '@chakra-ui/react'
import React from 'react'
import {
  CloseIcon,
  CopyIcon,
  DeleteIcon,
  EmailIcon,
  QuestionOutlineIcon,
} from '@chakra-ui/icons'
import { useContext } from 'react'
import { TimestampContext } from './TimestampContext'
import { QUOTATION_INFO_TEXT } from './constants/constants'
import { UnavailableFeatureTooltip } from './UnavailableFeatureTooltip'

interface Props {
  closeForms: () => void
}

const copyTooltipText = chrome.i18n.getMessage('ext_copy_tooltip')
const clearTextareaTooltipText = chrome.i18n.getMessage(
  'ext_clear_textarea_tooltip'
)
const hideFormsTooltipText = chrome.i18n.getMessage('ext_hide_forms_tooltip')
console.log(hideFormsTooltipText)
export const MenuBar: React.FC<Props> = ({ closeForms }) => {
  const { text, setText, clearText } = useContext(TimestampContext)
  const toast = useToast()

  const clearTimestamps = async () =>
    (await confirm('入力内容をリセットします')) && clearText()

  const copyToClipboard = async () => {
    const textToCopy = `${text}\n\n${QUOTATION_INFO_TEXT}`
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast({
          title: 'Copied!',
          status: 'success',
          isClosable: true,
        })
      })
      .catch(() => {
        toast({ title: 'Copy failed...', status: 'error', isClosable: true })
      })
  }

  return (
    <HStack w="100%" h="40px" justify={'space-between'}>
      <HStack>
        <Tooltip label={copyTooltipText} hasArrow fontSize="lg">
          <IconButton
            aria-label="Copy to clipboard"
            colorScheme="teal"
            size="lg"
            fontSize="20px"
            icon={<CopyIcon />}
            onClick={copyToClipboard}
          />
        </Tooltip>
        <Tooltip label={clearTextareaTooltipText} hasArrow fontSize="lg">
          <IconButton
            aria-label="clear text"
            colorScheme="red"
            variant="outline"
            size="lg"
            fontSize="16px"
            icon={<DeleteIcon />}
            onClick={clearTimestamps}
          />
        </Tooltip>
        <Tooltip label={hideFormsTooltipText} hasArrow fontSize="lg">
          <IconButton
            aria-label="Hide forms"
            size="lg"
            fontSize="16px"
            icon={<CloseIcon />}
            onClick={closeForms}
          />
        </Tooltip>
      </HStack>
      <HStack>
        <UnavailableFeatureTooltip>
          <IconButton
            aria-label="Contact me"
            fontSize="16px"
            icon={<EmailIcon />}
            disabled
          />
        </UnavailableFeatureTooltip>
        <UnavailableFeatureTooltip>
          <IconButton
            aria-label="how to use"
            fontSize="16px"
            icon={<QuestionOutlineIcon />}
            disabled
          />
        </UnavailableFeatureTooltip>
      </HStack>
    </HStack>
  )
}
