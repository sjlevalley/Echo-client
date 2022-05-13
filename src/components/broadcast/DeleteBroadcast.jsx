import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { deleteBroadcastAction } from "../../redux/broadcasts/broadcastActions";

import { DialogActions, DialogTitle, Dialog, Button } from "@material-ui/core";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import MyButton from "../../util/MyButton";

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    left: "75%",
    top: "65%",
    position: "absolute",
  },
}));

function DeleteBroadcast({ broadcastId }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(() => true);
  };

  const handleClose = () => {
    setIsOpen(() => false);
  };
  const deleteBroadcast = () => {
    dispatch(deleteBroadcastAction(broadcastId));
    setIsOpen(() => false);
  };

  return (
    <>
      <MyButton
        tip="Delete Broadcast"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutlineIcon color="error" />
      </MyButton>
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Are you sure you want to delete this Broadcast?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteBroadcast} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteBroadcast;
