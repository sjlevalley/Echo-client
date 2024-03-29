import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
// MUI
import AppIcon from '../images/icon.png'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
// Components
import { clearError } from '../redux/ui/uiSlice'
import { signup } from '../redux/auth/authActions'

const useStyles = makeStyles(theme => ({
  button: { ...theme.button, float: 'none' },
  customError: theme.customError,
  form: theme.form,
  image: theme.image,
  pageTitle: theme.pageTitle,
  progress: theme.progress,
  textField: theme.textField
}))

function Signup () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles()

  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUsername] = useState('')

  const errors = useSelector(state => state.ui.errors)
  const loading = useSelector(state => state.ui.loading)
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  const handleSubmit = e => {
    e.preventDefault()
    const userData = {
      email,
      password,
      confirmPassword,
      userName
    }
    dispatch(signup(userData, navigate))
  }

  const handleChange = e => {
    dispatch(clearError({}))
    if (e.target.name === 'email') setEmail(() => e.target.value)
    if (e.target.name === 'password') setPassword(() => e.target.value)
    if (e.target.name === 'confirmPassword')
      setConfirmPassword(() => e.target.value)
    if (e.target.name === 'userName') setUsername(() => e.target.value)
  }

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='icon' className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id='email'
            name='email'
            helperText={errors?.email}
            error={errors?.email ? true : false}
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
            helperText={errors?.password}
            error={errors?.password ? true : false}
            type='password'
            label='Password'
            className={classes.textField}
            value={password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id='confirmPassword'
            name='confirmPassword'
            helperText={errors?.confirmPassword}
            error={errors?.confirmPassword ? true : false}
            type='password'
            label='Confirm Password'
            className={classes.textField}
            value={confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id='userName'
            name='userName'
            helperText={errors?.userName}
            error={errors?.userName ? true : false}
            type='text'
            label='Username'
            className={classes.textField}
            value={userName}
            onChange={handleChange}
            fullWidth
          />
          {errors?.general && (
            <Typography variant='body2' className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={25} className={classes.progress} />
            ) : (
              'Signup'
            )}
          </Button>
          <br />
          <small>
            Already have an account? Login <Link to='/login'>Here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}

export default Signup
