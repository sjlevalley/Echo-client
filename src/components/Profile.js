import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { Link as MuiLink, IconButton } from '@mui/material'
import { uploadImage, logout } from '../redux/user/userActions'

import MyButton from '../util/MyButton'

import { Typography, Tooltip, Paper, Button } from '@material-ui/core'
import {
  LocationOn,
  CalendarToday,
  Link as IconLink,
  Edit as EditIcon,
  KeyboardReturn
} from '@mui/icons-material'
import EditDetails from './EditDetails'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: 20
  },
  imageWrapper: {
    textAlign: 'center',
    position: 'relative',
    '& button': {
      position: 'absolute',
      top: '80%',
      left: '70%'
    }
  },
  profileImage: {
    width: 200,
    height: 200,
    objectFit: 'cover',
    maxWidth: '100%',
    borderRadius: '50%'
  },
  profileDetails: {
    textAlign: 'center',
    '& span, svg': {
      verticalAlign: 'middle'
    },
    '& a': {
      color: '#00bcd4'
    }
  },
  hr: {
    border: 'none',
    margin: '0 0 10px 0'
  },
  button: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  userNameLink: {
    textDecoration: 'none !important'
  }
}))

function Profile() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const loading = useSelector(state => state.user.loading)
  const user = useSelector(state => state.user)
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
          <MyButton tip='Logout' onClick={(e) => handleLogout(e)} placement='top'>
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
    <p>Loading...</p>
  )

  return profileMarkup
}

export default Profile
