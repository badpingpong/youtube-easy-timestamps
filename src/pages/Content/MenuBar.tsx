import { HStack, IconButton, Tooltip, useToast } from '@chakra-ui/react'
import React from 'react'
import {
  CopyIcon,
  DeleteIcon,
  EmailIcon,
  QuestionOutlineIcon,
} from '@chakra-ui/icons'
import { useContext } from 'react'
import { TimestampContext } from './TimestampContext'
import { QUOTATION_INFO_TEXT } from './constants/constants'
import { UnavailableFeatureTooltip } from './UnavailableFeatureTooltip'

export const MenuBar: React.FC = () => {
  const { text, setText } = useContext(TimestampContext)
  const toast = useToast()

  const clearTimestamps = async () => {
    if (await confirm('入力内容をリセットします')) {
      setText('')
    }
  }
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
    <HStack w="100%" h="40px" px={4} justify={'space-between'}>
      <HStack>
        <Tooltip label="copy to clipboard" hasArrow fontSize="lg">
          <IconButton
            aria-label="Copy to clipboard"
            icon={<CopyIcon boxSize={10} />}
            onClick={copyToClipboard}
          />
        </Tooltip>
        <Tooltip label="clear text" hasArrow fontSize="lg">
          <IconButton
            aria-label="clear text "
            icon={<DeleteIcon boxSize={8} />}
            onClick={clearTimestamps}
          />
        </Tooltip>
      </HStack>
      <HStack>
        <UnavailableFeatureTooltip>
          <IconButton
            aria-label="Copy to clipboard"
            icon={<EmailIcon boxSize={7} />}
            disabled
          />
        </UnavailableFeatureTooltip>
        <IconButton
          aria-label="Copy to clipboard"
          icon={<QuestionOutlineIcon boxSize={6} />}
          disabled
        />
      </HStack>
    </HStack>
  )
}
