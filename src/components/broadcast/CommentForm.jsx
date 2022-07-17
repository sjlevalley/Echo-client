import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// MUI
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// Components
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { clearError, setError } from '../../redux/ui/uiSlice'
import { submitCommentBroadcastAction } from '../../redux/broadcasts/broadcastActions'

const useStyles = makeStyles(theme => ({
  button: theme.button,
  textField: theme.textField,
  visibleSeparator: theme.visibleSeparator
}))

function CommentForm () {
  const classes = useStyles()
  const dispatch = useDispatch()

  const broadcast = useSelector(state => state.broadcasts.broadcast)
  const errors = useSelector(state => state.ui.errors)
  const user = useSelector(state => state.auth)

  const [commentText, setCommentText] = useState('')

  const { authenticated } = user

  const handleSubmit = e => {
    const { broadcastId } = broadcast
    e.preventDefault()
    if (!commentText || commentText === '') {
      dispatch(setError({ comment: 'Must not be empty' }))
      return
    }
    dispatch(submitCommentBroadcastAction(broadcastId, { body: commentText }))
    setCommentText(() => '')
  }

  const handleChange = e => {
    dispatch(clearError())
    setCommentText(() => e.target.value)
  }

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name='commentText '
          type='text'
          label='Leave a Comment'
          error={errors?.comment ? true : false}
          helperText={errors?.comment}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes.button}
        >
          Submit
        </Button>
      </form>
    </Grid>
  ) : null
  return <>{commentFormMarkup}</>
}

export default CommentForm
