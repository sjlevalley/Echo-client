import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// MUI
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  visibleSeparator: theme.visibleSeparator,
  invisibleSeparator: theme.invisibleSeparator,
  commentImage: theme.commentImage,
  commentData: theme.commentData,
}));

function Comments({ comments }) {
  const classes = useStyles();

  return (
    <Grid container>
      {comments?.map((comment, index) => {
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
