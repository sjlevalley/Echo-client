import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import { Close as CloseIcon, UnfoldMore } from "@mui/icons-material";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";

import MyButton from "../util/MyButton";
import { getSingleBroadcastAction } from "../redux/broadcasts/broadcastActions";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "10px auto",
  },
  invisibleSeparator: {
    border: "none",
    margin: 4,
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
    position: "absolute",
    // left: "90%",
  },
  expandButton: {
    position: "absolute",
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
  const loading = useSelector((state) => state.ui.loading);
  const errors = useSelector((state) => state.ui.errors);
  const broadcast = useSelector((state) => state.broadcasts.broadcast);
  const { body, createdAt, likeCount, commentCount, userImage, userName } =
    broadcast;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    dispatch(getSingleBroadcastAction(broadcastId));
    setIsOpen(() => true);
  };
  const handleClose = () => {
    setIsOpen(() => false);
  };

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={100} thickness={2} />
    </div>
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
      </Grid>
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
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
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
