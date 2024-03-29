import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// MUI
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// Components
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import MyButton from '../../util/MyButton'
import { deleteBroadcastAction } from '../../redux/broadcasts/broadcastActions'

const useStyles = makeStyles(theme => ({
  deleteButton: theme.deleteButton
}))

function DeleteBroadcast ({ broadcastId }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(() => true)
  }

  const handleClose = () => {
    setIsOpen(() => false)
  }
  const deleteBroadcast = () => {
    dispatch(deleteBroadcastAction(broadcastId))
    setIsOpen(() => false)
  }

  return (
    <>
      <MyButton
        tip='Delete Broadcast'
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutlineIcon color='error' />
      </MyButton>
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>
          Are you sure you want to delete this Broadcast?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={deleteBroadcast} color='secondary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteBroadcast
