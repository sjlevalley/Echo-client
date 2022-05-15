import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { IconButton } from '@mui/material'

const MyButton = ({
  children,
  onClick,
  btnClassName,
  tipClassName,
  tip,
  placement
}) => (
  <Tooltip title={tip} className={tipClassName} placement={placement}>
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
)

export default MyButton
