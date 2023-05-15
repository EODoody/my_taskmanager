import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  backgroundImage: {
    position: "fixed",
    top: 0,
    backgroundImage: theme.palette.index.default,
    zIndex: -1,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
  },
  paper: {
    backgroundColor: 'rgba(128, 128, 128, 0)',
    width: '50%',
    height: '40%',
    marginRight: '30%',
    fontWeight: 'bold',
    zIndex: 2,
    marginLeft: '-10%',
    borderRadius: '5%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'left',
  },
  boldBlackText: {
    fontWeight: 'bold',
    flexGrow: 1, // Fill the available space vertically
    fontSize: '1.5rem', // Adjust the value based on your needs
    color: theme.palette.primary.main,
},
  AccentText: { 
    color: theme.palette.secondary.main,
  }
}));

const IndexPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <Typography variant="h1" gutterBottom className={classes.boldBlackText}>
         <strong>DAY-<span
    className={classes.AccentText}
  >O</span> </strong> 
        </Typography>
        <Typography variant="h3" className={classes.boldBlackText}>
         Create tasks asign them, and organise your life.
        </Typography>
        <Typography variant="h3" className={classes.AccentText}>
          All in ONE PLACE.
        </Typography>
        <br></br>
        <br></br>
        <Typography variant="h5" className={classes.boldBlackText}>
          Day-O is a powerful solution to procrastination and a good task
          management tool designed to help you stay organized and productive.
        </Typography>
      </div>

      <div className={classes.backgroundImage} />
     
    </div>
  );
};

export default IndexPage;
