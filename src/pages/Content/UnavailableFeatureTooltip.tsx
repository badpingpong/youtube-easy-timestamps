import { Tooltip } from '@chakra-ui/react'
import React from 'react'

const tooltipText = chrome.i18n.getMessage('ext_unavailable_feature_tooltip')
export const UnavailableFeatureTooltip: React.FC = ({ children }) => (
  <Tooltip label={tooltipText} shouldWrapChildren hasArrow fontSize="lg">
    {children}
  </Tooltip>
)
