import React from 'react'
import { IconBaseProps } from 'react-icons'
import { FaStamp } from 'react-icons/fa'

type IconProps = IconBaseProps
export const StampIcon: React.FC<IconProps> = (props) => <FaStamp {...props} />
