import React from 'react'

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import DefaultImage from '../images/DefaultImage.png'

const useStyles = makeStyles(theme => ({
  card: {
    display: 'block',
    marginBottom: 10
  },
  cardContent: {
    width: '100%',
    flexDirection: 'column',
    padding: 25
  },
  cover: {
    height: 200,
    minWidth: 200,
    objectFit: 'cover',
    borderRadius: '50%',
    marginLeft: 25
  },
  userName: {
    width: 60,
    height: 20,
    backgroundColor: '#00bcd4',
    marginBottom: 5
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginBottom: 10
  },
  fullLine: {
    height: 15,
    width: '90%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    width: '50%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginBottom: 10
  },
  textBox: {
    height: '150px',
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: '100%'
  },
  submitBtn: {
    height: '30px',
    margin: '10px auto',
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: '20%'
  },
  progress: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

function BroadcastDialogSkeleton () {
  const classes = useStyles()

  const content = (
    <Card className={classes.card}>
      <div style={{ display: 'flex' }}>
        <CardMedia className={classes.cover} image={DefaultImage} />
        <CardContent className={classes.cardContent}>
          <div className={classes.userName}></div>
          <div className={classes.date}></div>
          <div className={classes.fullLine}></div>
          <div className={classes.fullLine}></div>
          <div className={classes.halfLine}></div>
        </CardContent>
      </div>
      <CardContent>
        <div className={classes.textBox}></div>
        <div className={classes.submitBtn}></div>
        <div className={classes.progress}>
          <CircularProgress size={50} thickness={2} />
        </div>
      </CardContent>
    </Card>
  )

  return <>{content}</>
}

export default BroadcastDialogSkeleton
