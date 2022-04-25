import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import AppIcon from '../images/icon.png'
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '0px auto'
  },
  textField: {
    margin: '10px auto'
  },
  pageTitle: {
    margin: '10px auto'
  },
  button: {
    margin: '20px auto',
    position: 'relative',
    width: '100px'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    margin: '10px 0 0 0'
  },
  progress: {
  }
}));


function Login() {
  const navigate = useNavigate()
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(() => true)
    const userData = {
      email: email,
      password: password,
    }
    axios.post('/api/login', userData)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
        setLoading(() => false)
        navigate('/')
      })
      .catch((e) => {
        console.error(e)
        setErrors(() => e.response.data)
        setLoading(() => false)
      })
  }

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(() => e.target.value)
    }
    if (e.target.name === 'password') {
      setPassword(() => e.target.value)
    }
  }

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='icon' className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id='email'
            name='email'
            helperText={errors.email}
            error={errors.email ? true : false}
            type='email'
            label='Email'
            className={classes.textField}
            value={email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            id='password'
            name='password'
            helperText={errors.password}
            error={errors.password ? true : false}
            type='password'
            label='Password'
            className={classes.textField}
            value={password}
            onChange={handleChange}
            fullWidth
          />
          {errors.e && (
            <Typography variant='body2' className={classes.customError}>
              {errors.e}
            </Typography>

          )}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={loading}
          >
            {loading ? <CircularProgress size={25} className={classes.progress} /> : 'Login'}
          </Button>
          <br />
          <small>Don't have an account? Sign up <Link to='/signup'>Here</Link></small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}

export default Login
