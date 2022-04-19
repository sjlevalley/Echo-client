import React from 'react'
import { Link } from 'react-router-dom'

// Import MUI components
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'

function Navbar () {
  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar className='nav-container'>
          <Button color='inherit' component={Link} to='/login'>
            Login
          </Button>
          <Button color='inherit' component={Link} to='/'>
            Home
          </Button>
          <Button color='inherit' component={Link} to='/signup'>
            Signup
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
