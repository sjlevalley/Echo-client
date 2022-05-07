import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editUserDetails } from '../redux/user/userActions'
import {
  Tooltip,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from '@material-ui/core'
import { Edit as EditIcon } from '@mui/icons-material'

import MyButton from '../util/MyButton'


import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    float: 'right'
  },
  textField: {
    margin: '10px auto'
  }
}))

function EditDetails() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [bio, setBio] = useState('')
  const [website, setWebsite] = useState('')
  const [location, setLocation] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const userBio = useSelector(state => state.user.bio)
  const userWebsite = useSelector(state => state.user.website)
  const userLocation = useSelector(state => state.user.location)

  useEffect(() => {
    setBio(() => (userBio ? userBio : ''))
    setLocation(() => (userLocation ? userLocation : ''))
    setWebsite(() => (userWebsite ? userWebsite : ''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpen = () => {
    setIsOpen(() => true)
  }
  const handleClose = () => {
    setIsOpen(() => false)
  }

  const handleChange = e => {
    if (e.target.name === 'bio') setBio(() => e.target.value)
    if (e.target.name === 'website') setWebsite(() => e.target.value)
    if (e.target.name === 'location') setLocation(() => e.target.value)
  }

  const handleSubmit = () => {
    const userDetails = {
      bio,
      website,
      location
    }
    dispatch(editUserDetails(userDetails))
    handleClose()
  }

  return (
    <>
      <MyButton tip='Edit Details' onClick={handleOpen} btnClassName={classes.button} placement='top'>
        <EditIcon color='primary' />
      </MyButton>
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>Edit Your Details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='bio'
              type='text'
              label='Bio'
              multiline
              rows='3'
              placeholder='A short bio about yourself'
              className={classes.textField}
              value={bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='website'
              type='text'
              label='Website'
              placeholder='Your personal/professional website'
              className={classes.textField}
              value={website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='location'
              type='text'
              label='Location'
              placeholder='Where you live'
              className={classes.textField}
              value={location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditDetails
