import React from 'react'
import withStyles from '@material-ui/styles/withStyles'

const styles = {
  card: {
    display: 'flex'
  }
}

function Broadcast ({ broadcast }) {
  return <div>{broadcast.body}</div>
}

export default withStyles(styles)(Broadcast)
