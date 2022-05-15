import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// MUI
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
// Components
import MyButton from "../../util/MyButton";
import {
  likeBroadcastAction,
  unlikeBroadcastAction,
} from "../../redux/broadcasts/broadcastActions";

function LikeButton({ broadcast }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const { authenticated } = user;
  const { broadcastId } = broadcast;

  const isBroadcastLiked = () => {
    const found = user.likes?.find((like) => like.broadcastId === broadcastId);
    if (found) {
      return true;
    } else {
      return false;
    }
  };

  const likeBroadcast = () => {
    dispatch(likeBroadcastAction(broadcastId));
  };
  const unlikeBroadcast = () => {
    dispatch(unlikeBroadcastAction(broadcastId));
  };

  const likeButton = !authenticated ? (
    <Link to="/login">
      <MyButton tip="Must be logged in to like">
        <FavoriteBorderIcon color="primary" />
      </MyButton>
    </Link>
  ) : isBroadcastLiked() ? (
    <MyButton tip="Unlike" onClick={unlikeBroadcast}>
      <FavoriteIcon fontSize="small" color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={likeBroadcast}>
      <FavoriteBorderIcon fontSize="small" color="primary" />
    </MyButton>
  );
  return likeButton;
}

export default LikeButton;
