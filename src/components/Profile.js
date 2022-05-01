import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { Link as MuiLink } from '@mui/material';
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import { LocationOn, CalendarToday, Link as IconLink } from '@mui/icons-material'



const useStyles = makeStyles(theme => ({
    paper: {
        padding: 20
    },
    imageWrapper: {
        textAlign: 'center',
        position: 'relative',
        '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
        }
    },
    profileImage: {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
    },
    profile: {
        imageWrapper: {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        profileImage: {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        profileDetails: {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: '#00bcd4'
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
}))

function Profile() {
    const classes = useStyles()
    const loading = useSelector(state => state.user.loading)
    const user = useSelector(state => state.user)
    const { authenticated, userName, bio, location, website, createdAt } = user

    let profileMarkup = !loading ? (authenticated ? (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className={classes.imageWrapper}>
                    <img src={user.imageUrl} alt='profile' className={classes.profileImage} />
                </div>
                <hr />
                <div className=''>
                    <MuiLink
                        component={Link}
                        to={`/users/${userName}`}
                        color='primary'
                        variant='h5'
                    >
                        @{userName}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant='body2'>{bio}</Typography>}
                    {location && (
                        <>
                            <LocationOn color='primary' /><span>{location}</span>
                            <hr />
                        </>
                    )}
                    {website && (
                        <>
                            <IconLink color='primary' />
                            <a href={website} target='_blank' rel='noopener noreferrer'>
                                {' '}{website}
                            </a>
                            <hr />
                        </>
                    )}
                    <CalendarToday color='primary' />
                    <span>Joined  {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
            </div>
        </Paper>
    ) : (<Paper>
        <Typography variant='body2' align='center'>
            No Profile Found, please Login again
        </Typography>
        <div className={classes.buttons}>
            <Button variant='contained' color='primary' component={Link} to='/login'>Login</Button>
            <Button variant='contained' color='primary' component={Link} to='/signup'>Signup</Button>

        </div>

    </Paper>)) : (<p>Loading...</p>);

    return profileMarkup
}

export default Profile