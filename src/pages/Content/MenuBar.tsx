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
export const MenuBar: React.FC<Props> = ({ closeForms }) => {
  const { text, setText, loadText } = useContext(TimestampContext)
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
    <HStack w="100%" h="40px" justify={'space-between'}>
      <HStack>
        <Tooltip label="copy to clipboard" hasArrow fontSize="lg">
          <IconButton
            aria-label="Copy to clipboard"
            colorScheme="teal"
            size="lg"
            fontSize="20px"
            icon={<CopyIcon />}
            onClick={copyToClipboard}
          />
        </Tooltip>
        <Tooltip label="clear text" hasArrow fontSize="lg">
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
        <Tooltip label="clear text" hasArrow fontSize="lg">
          <IconButton
            aria-label="clear text"
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
            aria-label="Copy to clipboard"
            fontSize="16px"
            icon={<EmailIcon />}
            disabled
          />
        </UnavailableFeatureTooltip>
        <IconButton
          aria-label="Copy to clipboard"
          fontSize="16px"
          icon={<QuestionOutlineIcon />}
          disabled
        />
      </HStack>
    </HStack>
  )
}
