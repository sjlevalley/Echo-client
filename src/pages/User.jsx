import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  getUserDataBroadcastAction,
  clearUserProfileBroadcastAction,
} from "../redux/broadcasts/broadcastActions";
import StaticProfile from "../components/profile/StaticProfile";
import BroadcastSkeleton from "../util/BroadcastSkeleton";

import Broadcast from "../components/broadcast/Broadcast";
import { Grid } from "@material-ui/core";

function User() {
  const dispatch = useDispatch();
  const params = useParams();
  const broadcasts = useSelector((state) => state.broadcasts.broadcasts);
  const loading = useSelector((state) => state.ui.loading);
  const profile = useSelector((state) => state.broadcasts.userProfile);

  useEffect(() => {
    const userName = params.userName;
    dispatch(getUserDataBroadcastAction(userName));
    return () => {
      dispatch(clearUserProfileBroadcastAction());
    };
  }, [dispatch]);

  const broadcastsMarkup = loading ? (
    <BroadcastSkeleton />
  ) : broadcasts.length === 0 ? (
    <p>No Broadcasts Yet from this User</p>
  ) : (
    broadcasts.map((broadcast) => (
      <Broadcast key={broadcast.broadcastId} broadcast={broadcast} />
    ))
  );
  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {broadcastsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile ? (
          <StaticProfile profile={profile} />
        ) : (
          <p>Loading User Profile...</p>
        )}
      </Grid>
    </Grid>
  );
}

export default User;
