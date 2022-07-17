import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'
// Local IMports
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import User from './pages/User'
import { appPageTheme } from './util/theme'
import { logout } from './redux/auth/authActions'
import './App.css'
// MUI
import Navbar from './components/layout/Navbar'
import PrivateRoute from './util/PrivateRoute'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'

axios.defaults.baseURL = 'https://us-central1-echo-726ac.cloudfunctions.net'

const theme = createTheme(appPageTheme)

function App () {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    if (user?.token_exp * 1000 < Date.now()) {
      dispatch(logout())
    }
  }, [dispatch, user])

  return (
    <MuiThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path='/login' element={<Login />} user={user} />
              <Route path='/signup' element={<Signup />} user={user} />
              <Route
                exact
                path='/users/:userName'
                element={<User />}
                user={user}
              />
              <Route
                exact
                path='/users/:userName/broadcast/:broadcastId'
                element={<User />}
                user={user}
              />
              <Route
                path='/'
                element={
                  <PrivateRoute user={user} redirectPath='/login'>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                element={<PrivateRoute user={user} redirectPath='/login' />}
              >
                <Route path='/' element={<Home />} />
                {/* Can add more protected routes here nested in this parent route */}
              </Route>
            </Routes>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  )
}

export default App
