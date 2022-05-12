import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress
} from '@material-ui/core'
import {
  Add as AddIcon,
  Close as CloseIcon
} from '@mui/icons-material'

import MyButton from '../util/MyButton'
import { postBroadcastAction } from '../redux/broadcasts/broadcastActions'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  textField: {
    margin: '10px auto'
  },
  submitButton: {
    // position: 'relative'
    float: 'right',
    margin: '1rem 0'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'relative',
    // left: '20%',
    top: '10%'
  }
}))

function PostBroadcast() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const loading = useSelector(state => state.ui.loading)

  const [isOpen, setIsOpen] = useState(false)
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState({})
  // const errors = useSelector(state => state.ui.errors)

  const handleOpen = () => {
    setIsOpen(() => true)
  }
  const handleClose = () => {
    setIsOpen(() => false)
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (!body || body === '') {
      setErrors({ body: 'Must not be empty' })
      return
    }
    dispatch(
      postBroadcastAction({
        body
      })
    )
    setBody(() => '')
    handleClose()
  }
  const handleChange = e => {
    setErrors({})
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
