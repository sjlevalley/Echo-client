import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid } from '@material-ui/core'

import Broadcast from '../components/Broadcast'

// https://us-central1-echo-726ac.cloudfunctions.net/api

function Home() {
  const [broadcasts, setBroadcasts] = useState(null)

  const recentBroadcasts = broadcasts ? (
    broadcasts.map(broadcast => <Broadcast key={broadcast.broadcastId} broadcast={broadcast} />)
  ) : (
    <p key={Math.random()}>Loading...</p>
  )

  useEffect(() => {
    axios
      .get('/api/broadcasts')
      .then(res => {
        setBroadcasts(() => res.data)
      })
      .catch(e => {
        console.error(e)
      })
  }, [])

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {recentBroadcasts}
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile...</p>
      </Grid>
    </Grid>
  )
}

export default Home
