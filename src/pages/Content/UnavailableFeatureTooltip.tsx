import { Tooltip } from '@chakra-ui/react'
import React from 'react'

export const UnavailableFeatureTooltip: React.FC = ({ children }) => (
  <Tooltip
    label="Sorry. This feature is not available now."
    shouldWrapChildren
    hasArrow
  >
    {children}
  </Tooltip>
)
