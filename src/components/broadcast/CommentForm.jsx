import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { submitCommentBroadcastAction } from "../../redux/broadcasts/broadcastActions";
import { clearError } from "../../redux/ui/uiSlice";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "10px auto",
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  button: {
    margin: "20px auto",
    position: "relative",
    width: "100px",
  },
}));

function CommentForm({ broadcastId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const errors = useSelector((state) => state.ui.errors);
  const loading = useSelector((state) => state.ui.loading);
  const [commentText, setCommentText] = useState(null);

  const { authenticated } = user;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitCommentBroadcastAction(broadcastId, { body: commentText }));
    setCommentText(() => null);
  };

  const handleChange = (e) => {
    dispatch(clearError());
    setCommentText(() => e.target.value);
  };

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="commentText "
          type="text"
          label="Leave a comment"
          error={errors?.comment ? true : false}
          helperText={errors?.comment}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;
  return <>{commentFormMarkup}</>;
}

export default CommentForm;
