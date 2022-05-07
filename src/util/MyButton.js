import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { Link as MuiLink, IconButton } from '@mui/material'
import {
  LocationOn,
  CalendarToday,
  Link as IconLink,
  Edit as EditIcon,
  KeyboardReturn
} from '@mui/icons-material'

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
