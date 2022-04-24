import React from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    marginBottom: 10
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
}));

function Broadcast({ broadcast }) {
  const classes = useStyles();
  const { userImage, body, createdAt, userName, broadcastId, likeCount, commentCount } = broadcast
  dayjs.extend(relativeTime)

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.image}
        image={userImage}
        title='Profile Image' />
      <CardContent className={classes.content}>
        <Typography component={Link} to={`/users/${userName}`} variant='h5' color='primary'>{userName}</Typography>
        <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
        <Typography variant='body1'>{body}</Typography>
      </CardContent>

    </Card>
  )
}

export default Broadcast
