import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import DefaultImage from "../images/DefaultImage.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    marginBottom: 10,
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25,
  },
  cover: {
    minWidth: 200,
    objectFit: "cover",
  },
  userName: {
    width: 60,
    height: 20,
    backgroundColor: "#00bcd4",
    marginBottom: 5,
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: "rgba(0,0,0,0.3)",
    marginBottom: 10,
  },
  fullLine: {
    height: 15,
    width: "90%",
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

function BroadcastSkeleton() {
  const classes = useStyles();

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={DefaultImage} />
      <CardContent className={classes.cardContent}>
        <div className={classes.userName}></div>
        <div className={classes.date}></div>
        <div className={classes.fullLine}></div>
        <div className={classes.fullLine}></div>
        <div className={classes.halfLine}></div>
      </CardContent>
    </Card>
  ));

  return <>{content}</>;
  // return <>Loading...</>;
}

export default BroadcastSkeleton;
