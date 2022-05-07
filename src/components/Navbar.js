import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// Import MUI components
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import { Add as AddIcon, Home as HomeIcon, Notifications as NotificationsIcon } from '@mui/icons-material'

import MyButton from '../util/MyButton'

function Navbar() {

  const authenticated = useSelector(state => state.user.authenticated)
  console.log(authenticated)

  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar className='nav-container'>
          {authenticated ? (
            <>
              <MyButton tip="Post a Broadcast">
                <AddIcon color='primary' />
              </MyButton>
              <Link to={'/'}>
                <MyButton tip="Home">
                  <HomeIcon color='primary' />
                </MyButton>
              </Link>
              <MyButton tip='Notifications'>
                <NotificationsIcon color='primary' />
              </MyButton>
            </>
          ) : (
            <>
              <Button color='inherit' component={Link} to='/login'>
                Login
              </Button>
              <Button color='inherit' component={Link} to='/'>
                Home
              </Button>
              <Button color='inherit' component={Link} to='/signup'>
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
