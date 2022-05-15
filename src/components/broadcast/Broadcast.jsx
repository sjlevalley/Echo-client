import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// MUI
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import ChatIcon from "@mui/icons-material/Chat";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// Components
import BroadcastDialog from "./BroadcastDialog";
import DeleteBroadcast from "./DeleteBroadcast";
import LikeButton from "./LikeButton";
import MyButton from "../../util/MyButton";
import { getSingleBroadcastAction } from "../../redux/broadcasts/broadcastActions";

const useStyles = makeStyles((theme) => ({
  card: theme.card,
  span: theme.span,
  image: theme.broadcastCardImage,
  container: theme.container,
  content: theme.content,
  btnContainer: theme.btnContainer,
}));

function Broadcast({ broadcast }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
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

  // const viewComments = () => {
  //   dispatch(getSingleBroadcastAction(broadcastId));
  // };

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
          <MyButton
            tip="Comments"
            // onClick={viewComments}
          >
            <ChatIcon fontSize="small" color="primary" />
          </MyButton>
          {commentCount === 1 ? (
            <span className={classes.span}> {commentCount} Comment</span>
          ) : (
            <span>{commentCount} Comments</span>
          )}
        </div>
      </CardContent>
      <div className={classes.btnContainer}>
        <BroadcastDialog broadcastId={broadcastId} />
      </div>
    </Card>
  );
}

export default Broadcast;
