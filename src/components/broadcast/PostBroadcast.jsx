import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// MUI
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core'
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material'
import { makeStyles } from '@material-ui/core/styles'
// Components
import MyButton from '../../util/MyButton'
import { clearError, setError } from '../../redux/ui/uiSlice'
import { postBroadcastAction } from '../../redux/broadcasts/broadcastActions'

const useStyles = makeStyles(theme => ({
  closeButton: theme.closeButton,
  progressSpinner: theme.progressSpinner,
  submitButton: theme.submitButton,
  textField: theme.textField
}))

function PostBroadcast () {
  const classes = useStyles()
  const dispatch = useDispatch()

  const errors = useSelector(state => state.ui.errors)
  const loading = useSelector(state => state.ui.loading)

  const [body, setBody] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(() => true)
  }
  const handleClose = () => {
    setIsOpen(() => false)
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (!body || body === '') {
      dispatch(setError({ body: 'Must not be empty' }))
      return
    }
    dispatch(
      postBroadcastAction({
        body
      })
    )
    handleClose()
    setBody(() => '')
  }
  const handleChange = e => {
    dispatch(clearError())
    setBody(() => e.target.value)
  }

  return (
    <>
      <MyButton onClick={handleOpen} tip='Create a Broadcast!'>
        <AddIcon />
      </MyButton>
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth='sm'>
        <MyButton
          tip='Close'
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new Broadcast</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name='body'
              type='text'
              label='BROADCAST!'
              multiline
              minRows='3'
              placeholder='What do you want to Broadcast?'
              error={errors?.body ? true : false}
              helperText={errors?.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            ></TextField>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PostBroadcast
