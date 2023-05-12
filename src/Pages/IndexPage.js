import React from 'react';
import { makeStyles } from '@mui/styles';
import { Paper, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
    height: '100vh',
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'fixed',
    top: 0,
    left: '-100%',
    width: '300%',
    height: '100%',
    backgroundImage: theme.palette.mode === 'dark' ? `url(${require('./dark.png')})` : `url(${require('./light.png')})`,
    backgroundSize: 'auto',
    backgroundRepeat: 'repeat',
    animation: '$scrollBg 80s linear infinite',
    zIndex: -1,
  },
  '@keyframes scrollBg': {
    '0%': {
      transform: 'translateX(0)',
    },
    '100%': {
      transform: 'translateX(-100%)',
    },
  },
  paper: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    maxWidth: '600px',
    zIndex: 2,
  },
  
}));

const IndexPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h3" gutterBottom>
          Day-O 
        </Typography>
        <Typography variant="h5">
          Day-O is a powerful solution to procrastination and a good task management tool designed to help you stay organized and productive.
        </Typography>
        <Typography variant="h5">
          With Day-O, you can create tasks, assign them to team members, set deadlines, and track progress,
        </Typography>
        <Typography variant="h5">
           all in one place.
        </Typography>
      </Paper>
      <div className={classes.backgroundImage} /> {/* Add the background image div */}
      
    </div>
  );
};

export default IndexPage;
