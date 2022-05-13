import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "covey",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: 20,
  },
}));

function Comments({ comments }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loading = useSelector((state) => state.ui.loading);
  const errors = useSelector((state) => state.ui.errors);

  return (
    <Grid container>
      {comments.map((comment, index) => {
        const { body, createdAt, userImage, userName } = comment;
        return (
          <Fragment key={createdAt}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <img
                    src={userImage}
                    alt="comment"
                    className={classes.commentImage}
                  />
                </Grid>
                <Grid item sm={9}>
                  <div className={classes.commentData}>
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/users/${userName}`}
                      color="primary"
                    >
                      {userName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && (
              <hr className={classes.visibleSeparator} />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
}

export default Comments;
