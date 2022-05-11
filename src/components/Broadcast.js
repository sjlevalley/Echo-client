import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import {
  likeBroadcastAction,
  unlikeBroadcastAction
} from '../redux/broadcasts/broadcastActions'

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ChatIcon from '@mui/icons-material/Chat'

import MyButton from '../util/MyButton'
import DeleteBroadcast from './DeleteBroadcast'

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    marginBottom: 10
  },
  span: {
    fontSize: '12px'
  },
  container: {
    marginLeft: '-10px'
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
}))

function Broadcast ({ broadcast }) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const user = useSelector(state => state.user)
  dayjs.extend(relativeTime)

  const { authenticated } = user

  const {
    userImage,
    body,
    createdAt,
    userName,
    broadcastId,
    likeCount,
    commentCount
  } = broadcast

  const isBroadcastLiked = () => {
    const found = user.likes?.find(like => like.broadcastId === broadcastId)
    if (found) {
      return true
    } else {
      return false
    }
  }

  const likeBroadcast = () => {
    dispatch(likeBroadcastAction(broadcastId))
  }
  const unlikeBroadcast = () => {
    dispatch(unlikeBroadcastAction(broadcastId))
  }

  const likeButton = !authenticated ? (
    <MyButton tip='Must be logged in to like'>
      <Link to='/login'>
        <FavoriteBorderIcon color='primary' />
      </Link>
    </MyButton>
  ) : isBroadcastLiked() ? (
    <MyButton tip='Unlike' onClick={unlikeBroadcast}>
      <FavoriteIcon fontSize='small' color='primary' />
    </MyButton>
  ) : (
    <MyButton tip='Like' onClick={likeBroadcast}>
      <FavoriteBorderIcon fontSize='small' color='primary' />
    </MyButton>
  )

  const deleteButton =
    authenticated && userName === user.userName ? (
      <DeleteBroadcast broadcastId={broadcastId} />
    ) : null

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.image}
        image={userImage}
        title='Profile Image'
      />
      <CardContent className={classes.content}>
        <Typography
          component={Link}
          to={`/users/${userName}`}
          variant='h5'
          color='primary'
        >
          {userName}
        </Typography>

        {deleteButton}
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant='body1'>{body}</Typography>
        <div className={classes.container}>
          {likeButton}
          <span className={classes.span}>{likeCount} Likes</span>
          <MyButton tip='Comments'>
            <ChatIcon fontSize='small' color='primary' />
          </MyButton>
          {commentCount === 1 ? (
            <span className={classes.span}> {commentCount} Comment</span>
          ) : (
            <span>{commentCount} Comments</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default Broadcast
