import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import ChatIcon from "@mui/icons-material/Chat";

import MyButton from "../../util/MyButton";
import LikeButton from "./LikeButton";
import DeleteBroadcast from "./DeleteBroadcast";
import BroadcastDialog from "./BroadcastDialog";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    marginBottom: 10,
  },
  span: {
    fontSize: "12px",
  },
  container: {
    marginLeft: "-10px",
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
}));

function Broadcast({ broadcast }) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  dayjs.extend(relativeTime);

  const { authenticated } = user;

  const {
    userImage,
    body,
    createdAt,
    userName,
    broadcastId,
    likeCount,
    commentCount,
  } = broadcast;

  const deleteButton =
    authenticated && userName === user.userName ? (
      <DeleteBroadcast broadcastId={broadcastId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.image}
        image={userImage}
        title="Profile Image"
      />
      <CardContent className={classes.content}>
        <Typography
          component={Link}
          to={`/users/${userName}`}
          variant="h5"
          color="primary"
        >
          {userName}
        </Typography>

        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <div className={classes.container}>
          <LikeButton broadcast={broadcast} />
          <span className={classes.span}>{likeCount} Likes</span>
          <MyButton tip="Comments">
            <ChatIcon fontSize="small" color="primary" />
          </MyButton>
          {commentCount === 1 ? (
            <span className={classes.span}> {commentCount} Comment</span>
          ) : (
            <span>{commentCount} Comments</span>
          )}
        </div>
        <BroadcastDialog broadcastId={broadcastId} />
      </CardContent>
    </Card>
  );
}

export default Broadcast;
