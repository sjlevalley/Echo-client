import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  likeBroadcastAction,
  unlikeBroadcastAction,
} from "../redux/broadcasts/broadcastActions";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import MyButton from "../util/MyButton";

function LikeButton({ broadcast }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
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
