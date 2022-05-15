import React from "react";
import DefaultImage from "../images/DefaultImage.png";
import { makeStyles } from "@material-ui/core/styles";

import { Paper } from "@material-ui/core";
import {
  LocationOn,
  CalendarToday,
  Link as IconLink,
} from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  cover: {
    minWidth: 200,
    objectFit: "cover",
  },
  userName: {
    height: 20,
    width: 60,
    backgroundColor: "#00bcd4",
    margin: "0 auto 5px auto",
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: "rgba(0,0,0,0.3)",
    marginBottom: 10,
  },
  fullLine: {
    height: 15,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    width: "50%",
    backgroundColor: "rgba(0,0,0,0.1)",
    marginBottom: 10,
  },
}));

const ProfileSkeleton = () => {
  const classes = useStyles();

  const content = (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={DefaultImage} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.userName} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
          <LocationOn color="primary" />
          <span>Location</span>
          <hr />
          <IconLink color="primary" /> https://website.com
          <hr />
          <CalendarToday color="primary" />
          Joined date
        </div>
      </div>
    </Paper>
  );

  return <>{content}</>;
};

export default ProfileSkeleton;
