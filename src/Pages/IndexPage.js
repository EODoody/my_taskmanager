import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
    height: "100vh",
    paddingTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  backgroundImage: {
    position: "fixed",

    top: 0,
    left: "-100%",
    width: "300%",
    height: "100%",
    backgroundImage:
      theme.palette.mode === "dark"
        ? `url(${require("./dark.png")})`
        : `url(${require("./light.png")})`,
    backgroundSize: "auto",
    backgroundRepeat: "repeat",
    animation: "$scrollBg 60s linear infinite",
    zIndex: -1,
  },
  "@keyframes scrollBg": {
    from: {
      transform: "translateX(-30%)",
    },
    to: {
      transform: "translateX(30%)", // Adjust the value to transform the image off-screen
    },
  },
  paper: {
    padding: theme.spacing(3),
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    width: '50%',
    height: '40%',
    marginRight: '30%',
    fontWeight: 'bold',
    zIndex: 2,
    marginLeft: '15%',
    borderRadius: '5%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldBlackText: {
    fontWeight: 'bold',
    color: '#fff', // White text color
    flexGrow: 1, // Fill the available space vertically
    textAlign: 'center',
    fontSize: '1.5rem', // Adjust the value based on your needs
},
}));

const IndexPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <Typography variant="h2" gutterBottom className={classes.boldBlackText}>
          Day-O
        </Typography>

        <Typography variant="h5" className={classes.boldBlackText}>
          Day-O is a powerful solution to procrastination and a good task
          management tool designed to help you stay organized and productive.
        </Typography>
        <Typography variant="h5" className={classes.boldBlackText}>
          With Day-O, you can create tasks, assign them to team members, set
          deadlines, and track progress.
        </Typography>
        <Typography variant="h5" className={classes.boldBlackText}>
          All in one place.
        </Typography>
      </div>

      <div className={classes.backgroundImage} />
     
    </div>
  );
};

export default IndexPage;
