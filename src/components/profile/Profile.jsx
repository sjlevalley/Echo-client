import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
// MUI
import { Button, Paper, Typography } from '@material-ui/core'
import { Link as MuiLink } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import {
  CalendarToday,
  Edit as EditIcon,
  KeyboardReturn,
  Link as IconLink,
  LocationOn
} from '@mui/icons-material'
// Components
import EditDetails from './EditDetails'
import MyButton from '../../util/MyButton'
import ProfileSkeleton from '../../util/ProfileSkeleton'
import { uploadImage, logout } from '../../redux/auth/authActions'

const useStyles = makeStyles(theme => ({
  paper: theme.paper,
  imageWrapper: theme.imageWrapper,
  profileImage: theme.profileImage,
  profileDetails: theme.profileDetails,
  hr: theme.hr,
  button: theme.profileBtn,
  userNameLink: theme.userNameLink
}))

function Profile () {
  const dispatch = useDispatch()
  const classes = useStyles()

  const loading = useSelector(state => state.auth.loading)
  const user = useSelector(state => state.auth)
  const { authenticated, userName, bio, location, website, createdAt } = user

  const handleImageChange = e => {
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    dispatch(uploadImage(formData))
  }

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className={classes.imageWrapper}>
            <img
              src={user.imageUrl}
              alt='profile'
              className={classes.profileImage}
            />
            <input
              type='file'
              id='imageInput'
              onChange={handleImageChange}
              hidden='hidden'
            />
            <MyButton
              tip='Edit Profile Picture'
              onClick={handleEditPicture}
              btnClassName='button'
              placement='top'
            >
              <EditIcon color='primary' />
            </MyButton>
          </div>
          <hr className={classes.hr} />
          <div className={classes.profileDetails}>
            <MuiLink
              className={classes.userNameLink}
              component={Link}
              to={`/users/${userName}`}
              color='primary'
              variant='h5'
            >
              @{userName}
            </MuiLink>
            <hr className={classes.hr} />
            {bio && <Typography variant='body2'>{bio}</Typography>}
            {location && (
              <>
                <LocationOn color='primary' />
                <span>{location}</span>
                <hr className={classes.hr} />
              </>
            )}
            {website && (
              <>
                <IconLink color='primary' />
                <a href={website} target='_blank' rel='noopener noreferrer'>
                  {' '}
                  {website}
                </a>
                <hr className={classes.hr} />
              </>
            )}
            <CalendarToday color='primary' />
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>
          <MyButton tip='Logout' onClick={e => handleLogout(e)} placement='top'>
            <KeyboardReturn color='primary' />
          </MyButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper>
        <Typography variant='body2' align='center'>
          No Profile Found, please Login again
        </Typography>
        <div className={classes.button}>
          <Button
            variant='contained'
            color='primary'
            component={Link}
            to='/login'
          >
            Login
          </Button>
          <Button
            variant='contained'
            color='primary'
            component={Link}
            to='/signup'
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <ProfileSkeleton />
  )

  return profileMarkup
}

export default Profile
