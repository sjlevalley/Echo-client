import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";

import { fetchAllBroadcasts } from "../redux/broadcasts/broadcastActions";

import Profile from "../components/profile/Profile";
import Broadcast from "../components/broadcast/Broadcast";
import BroadcastSkeleton from "../util/BroadcastSkeleton";

function Home() {
  const dispatch = useDispatch();
  const broadcasts = useSelector((state) => state.broadcasts.broadcasts);

  const recentBroadcasts =
    broadcasts.length > 0 ? (
      broadcasts.map((broadcast) => (
        <Broadcast key={broadcast.broadcastId} broadcast={broadcast} />
      ))
    ) : (
      <BroadcastSkeleton />
    );

  useEffect(() => {
    dispatch(fetchAllBroadcasts());
  }, [dispatch]);

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {recentBroadcasts}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
}

export default Home;
