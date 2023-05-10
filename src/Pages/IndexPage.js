import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    height: '85.5vh',
    paddingTop: "20px"
  },
}));

const IndexPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p>Main Page</p>
      <h2>
        AddTaskAS DashBoardD asyncDAS DarkAS DarkSD A
      </h2>
    </div>
  );
};

export default IndexPage;
