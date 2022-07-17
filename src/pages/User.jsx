import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
// MUI
import { Grid } from '@material-ui/core'
// Components
import Broadcast from '../components/broadcast/Broadcast'
import BroadcastSkeleton from '../util/BroadcastSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'
import StaticProfile from '../components/profile/StaticProfile'
import {
  clearBroadcastBroadcastAction,
  clearUserProfileBroadcastAction,
  getSingleBroadcastAction,
  getUserDataBroadcastAction
} from '../redux/broadcasts/broadcastActions'

function User () {
  const dispatch = useDispatch()
  const params = useParams()

  const broadcasts = useSelector(state => state.broadcasts.broadcasts)
  const loading = useSelector(state => state.ui.loading)
  const profile = useSelector(state => state.broadcasts.userProfile)

  const { broadcastId, userName } = params

  useEffect(() => {
    dispatch(getUserDataBroadcastAction(userName))
    return () => {
      dispatch(clearUserProfileBroadcastAction())
    }
  }, [dispatch, userName])

  useEffect(() => {
    if (broadcastId) {
      dispatch(getSingleBroadcastAction(broadcastId))
    }
    return () => {
      dispatch(clearBroadcastBroadcastAction())
    }
  }, [dispatch, broadcastId])

  const broadcastsMarkup = loading ? (
    <BroadcastSkeleton />
  ) : broadcasts.length === 0 ? (
    <p>No Broadcasts Yet from this User</p>
  ) : (
    broadcasts.map(broadcast => (
      <Broadcast key={broadcast.broadcastId} broadcast={broadcast} />
    ))
  )
  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {broadcastsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile ? <StaticProfile profile={profile} /> : <ProfileSkeleton />}
      </Grid>
    </Grid>
  )
}

export default User
