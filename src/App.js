import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './redux/auth/authSlice'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { createTheme } from '@material-ui/core/styles'
import jwtDecode from 'jwt-decode'
import './App.css'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

// Components
import Navbar from './components/Navbar'
import PrivateRoute from './util/PrivateRoute'

// Utils
import { appPageTheme } from './util/theme'

const theme = createTheme(appPageTheme)

function App() {
  const [user, setUser] = useState(true)

  return (
    <MuiThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route
                path='/'
                element={
                  <PrivateRoute user={user} redirectPath='/login'>
                    <Home />
                  </PrivateRoute>
                } />
              <Route element={<PrivateRoute user={user} redirectPath='/login' />}>
                <Route path="/" element={<Home />} />
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
