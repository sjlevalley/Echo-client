import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// MUI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core'
import { Edit as EditIcon } from '@mui/icons-material'
import { makeStyles } from '@material-ui/core/styles'
// Components
import MyButton from '../../util/MyButton'
import { editUserDetails } from '../../redux/auth/authActions'

const useStyles = makeStyles(theme => ({
  button: theme.editDetailsBtn,
  textField: theme.textField
}))

function EditDetails () {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [bio, setBio] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [location, setLocation] = useState('')
  const [website, setWebsite] = useState('')

  const userBio = useSelector(state => state.auth.bio)
  const userLocation = useSelector(state => state.auth.location)
  const userWebsite = useSelector(state => state.auth.website)

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
      <MyButton
        tip='Edit Details'
        onClick={handleOpen}
        btnClassName={classes.button}
        placement='top'
      >
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
