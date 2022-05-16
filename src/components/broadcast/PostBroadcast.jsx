import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// MUI
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";
import { makeStyles } from "@material-ui/core/styles";
// Components
import MyButton from "../../util/MyButton";
import { postBroadcastAction } from "../../redux/broadcasts/broadcastActions";
import { clearError, setError } from "../../redux/ui/uiSlice";

const useStyles = makeStyles((theme) => ({
  textField: theme.textField,
  submitButton: theme.submitButton,
  progressSpinner: theme.progressSpinner,
  closeButton: theme.closeButton,
}));

function PostBroadcast() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loading = useSelector((state) => state.ui.loading);

  const [isOpen, setIsOpen] = useState(false);
  const [body, setBody] = useState("");
  const errors = useSelector((state) => state.ui.errors);

  const handleOpen = () => {
    setIsOpen(() => true);
  };
  const handleClose = () => {
    setIsOpen(() => false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!body || body === "") {
      dispatch(setError({ body: "Must not be empty" }));
      return;
    }
    dispatch(
      postBroadcastAction({
        body,
      })
    );
    handleClose();
    setBody(() => "");
  };
  const handleChange = (e) => {
    dispatch(clearError());
    setBody(() => e.target.value);
  };

  return (
    <>
      <MyButton onClick={handleOpen} tip="Create a Broadcast!">
        <AddIcon />
      </MyButton>
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new Broadcast</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="BROADCAST!"
              multiline
              minRows="3"
              placeholder="What do you want to Broadcast?"
              error={errors?.body ? true : false}
              helperText={errors?.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            ></TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PostBroadcast;
