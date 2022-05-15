import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// MUI

// Components
import ProfileSkeleton from "../../util/ProfileSkeleton";
import { makeStyles } from "@material-ui/core/styles";
import { Link as MuiLink } from "@mui/material";
import { Paper, Typography } from "@material-ui/core";
import {
  CalendarToday,
  Link as IconLink,
  LocationOn,
} from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
  },
  imageWrapper: {
    textAlign: "center",
    position: "relative",
    "& button": {
      position: "absolute",
      top: "80%",
      left: "70%",
    },
  },
  profileImage: {
    width: 200,
    height: 200,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
  },
  profileDetails: {
    textAlign: "center",
    "& span, svg": {
      verticalAlign: "middle",
    },
    "& a": {
      color: "#00bcd4",
    },
  },
  hr: {
    border: "none",
    margin: "0 0 10px 0",
  },
  button: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  userNameLink: {
    textDecoration: "none !important",
  },
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
