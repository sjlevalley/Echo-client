import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Grid } from '@material-ui/core'

import { fetchAllBroadcasts } from '../redux/broadcasts/broadcastActions'

import Profile from '../components/Profile'
import Broadcast from '../components/Broadcast'

function Home () {
  const dispatch = useDispatch()
  const broadcasts = useSelector(state => state.broadcasts.broadcasts)

  const recentBroadcasts = broadcasts ? (
    broadcasts.map(broadcast => (
      <Broadcast key={broadcast.broadcastId} broadcast={broadcast} />
    ))
  ) : (
    <p key={Math.random()}>Loading...</p>
  )

  useEffect(() => {
    dispatch(fetchAllBroadcasts())
  }, [])

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {recentBroadcasts}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  )
}

export default Home
