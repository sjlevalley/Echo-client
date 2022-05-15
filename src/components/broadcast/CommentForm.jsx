import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// MUI
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Components
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { clearError } from "../../redux/ui/uiSlice";
import { submitCommentBroadcastAction } from "../../redux/broadcasts/broadcastActions";

const useStyles = makeStyles((theme) => ({
  textField: theme.textField,
  visibleSeparator: theme.visibleSeparator,
  button: theme.button,
}));

function CommentForm({ broadcastId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const errors = useSelector((state) => state.ui.errors);
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
          label="Leave a Comment"
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
      {/* <hr className={classes.visibleSeparator} /> */}
    </Grid>
  ) : null;
  return <>{commentFormMarkup}</>;
}

export default CommentForm;