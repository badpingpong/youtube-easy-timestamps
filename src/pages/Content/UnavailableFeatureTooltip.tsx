import { Tooltip } from '@mui/material'
import React from 'react'

const tooltipText = chrome.i18n.getMessage('ext_unavailable_feature_tooltip')
export const UnavailableFeatureTooltip: React.FC = ({ children }) => (
  <Tooltip title={tooltipText}>
    <span>{children}</span>
  </Tooltip>
)
