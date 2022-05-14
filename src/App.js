import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './redux/user/userActions'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { createTheme } from '@material-ui/core/styles'
import './App.css'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import User from './pages/User'

// Components
import Navbar from './components/layout/Navbar'
import PrivateRoute from './util/PrivateRoute'

// Utils
import { appPageTheme } from './util/theme'

const theme = createTheme(appPageTheme)

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)

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
              <Route exact path='/users/:userName' element={<User />} user={user} />
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
