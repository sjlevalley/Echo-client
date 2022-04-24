import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { createTheme } from '@material-ui/core/styles'
import jwtDecode from 'jwt-decode'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

// Components
import Navbar from './components/Navbar'
import AuthRoute from './util/AuthRoute'

// Utils
import { appPageTheme } from './util/theme'

const theme = createTheme(appPageTheme)

const token = localStorage.FBIdToken

let authenticated
if (token) {
  const decodedToken = jwtDecode(token)
  console.log(decodedToken)
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false
  } else {
    authenticated = true
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  )
}

export default App
