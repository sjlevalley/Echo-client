import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// MUI
import ChatIcon from "@mui/icons-material/Chat";
import Typography from "@material-ui/core/Typography";
import { Close as CloseIcon, UnfoldMore } from "@mui/icons-material";
import { Dialog, DialogContent, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Components
import BroadcastDialogSkeleton from "../../util/BroadcastDialogSkeleton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import LikeButton from "./LikeButton";
import MyButton from "../../util/MyButton";
import {
  getSingleBroadcastAction,
  clearBroadcastBroadcastAction,
} from "../../redux/broadcasts/broadcastActions";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "10px auto",
  },
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "relative",
    width: "50px",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
}));

function BroadcastDialog({ broadcastId }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const broadcast = useSelector((state) => state.broadcasts.broadcast);
  const loading = useSelector((state) => state.ui.loading);

  const {
    body,
    createdAt,
    likeCount,
    comments,
    commentCount,
    userImage,
    userName,
  } = broadcast;

  const handleOpen = () => {
    dispatch(getSingleBroadcastAction(broadcastId));
  };
  const handleClose = () => {
    dispatch(clearBroadcastBroadcastAction());
  };

  const dialogMarkup =
    loading && !broadcast.userName ? (
      <BroadcastDialogSkeleton />
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img
            src={userImage}
            alt="ProfileImage"
            className={classes.profileImage}
          />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`api/users/${userName}`}
          >
            @{userName}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton broadcast={broadcast} />
          <span>{likeCount} likes</span>
          <MyButton tip="Comments">
            <ChatIcon fontSize="small" color="primary" />
          </MyButton>
          {commentCount === 1 ? (
            <span className={classes.span}> {commentCount} Comment</span>
          ) : (
            <span>{commentCount} Comments</span>
          )}
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm broadcastId={broadcastId} />
        <Comments comments={comments} />
      </Grid>
    );

  return (
    <>
      <MyButton
        onClick={handleOpen}
        tip="View Broadcast"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog
        open={broadcast.userName || loading}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.DialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BroadcastDialog;
