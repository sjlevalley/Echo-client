import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Link as MuiLink } from "@mui/material";
import { Paper, Typography } from "@material-ui/core";
import {
  CalendarToday,
  Link as IconLink,
  LocationOn,
} from "@mui/icons-material";
// Components
import ProfileSkeleton from "../../util/ProfileSkeleton";

const useStyles = makeStyles((theme) => ({
  paper: theme.paper,
  imageWrapper: theme.imageWrapper,
  profileImage: theme.profileImage,
  profileDetails: theme.profileDetails,
  hr: theme.hr,
  button: theme.profileBtn,
  userNameLink: theme.userNameLink,
}));

function StaticProfile({ profile }) {
  const classes = useStyles();
  const { userName, createdAt, imageUrl, bio, website, location } = profile;
  return (
    <>
      {!profile.userName ? (
        <ProfileSkeleton />
      ) : (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className={classes.imageWrapper}>
              <img
                src={imageUrl}
                alt="profile"
                className={classes.profileImage}
              />
            </div>
            <hr className={classes.hr} />
            <div className={classes.profileDetails}>
              <MuiLink
                className={classes.userNameLink}
                component={Link}
                to={`/users/${userName}`}
                color="primary"
                variant="h5"
              >
                @{userName}
              </MuiLink>
              <hr className={classes.hr} />
              {bio && <Typography variant="body2">{bio}</Typography>}
              {location && (
                <>
                  <LocationOn color="primary" />
                  <span>{location}</span>
                  <hr className={classes.hr} />
                </>
              )}
              {website && (
                <>
                  <IconLink color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                  <hr className={classes.hr} />
                </>
              )}
              <CalendarToday color="primary" />
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
          </div>
        </Paper>
      )}
    </>
  );
}

export default StaticProfile;
