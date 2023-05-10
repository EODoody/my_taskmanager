import React, { useState } from 'react';
import {  Grid, Paper, Typography, TextField, Button, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    height: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: '16px',
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: '8px',
  },
  submit: {
    margin: '24px 0px 16px',
  },
}));

export default function LoginPage({ handleLogin }) {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    loginRequest();
  };

  async function loginRequest() {
    try {
      await fetch('http://localhost:80/my-taskmanager/api/login', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('error');
        })
        .then((data) => {
          if (data.status) {
            localStorage.setItem('token', data.status);
            handleLogin();
          } else {
            // set error
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h4" gutterBottom>
          Log in
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={usernameHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={passwordHandler}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Log in
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgotpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
