import { Button, Paper, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  paper: {
    padding: "16px",
    width: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));



export default function ForgotPassword() {
  const navigate = useNavigate()
  const classes = useStyles();
  const [username, setUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const usernameHandler = (event) => {
    setUsername(event.target.value)
  }

  const newPasswordHandler = (event) => {
    setNewPassword(event.target.value)
  }

  const confirmNewPasswordHandler = (event) => {
    setConfirmNewPassword(event.target.value)
  }

  async function resetRequest() {
    try {
      await fetch('http://localhost:80/my-taskmanager/api/reset', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword
        }),
      })
        .then((respose) => {
          if (respose.ok) {
            return respose.json()
          }
          throw new Error('error')
        })
        .then((data) => {
          if (data.status) {
            // password reset successful
            navigate('/')
          } else {
            //set error
          }
        })
    } catch (error) {
      console.log(error.message)
    }
  }

  const submitHandler = (event) => {
    event.preventDefault()
  
    if (newPassword !== confirmNewPassword) {
      alert('New password and confirm new password do not match')
      return
    }
  
    resetRequest()
  }

  return (
<div className={classes.root}>
      <Paper className={classes.paper}>
        <form className={classes.form} onSubmit={submitHandler}>
          <Typography variant="h2" className={classes.title}>
            Reset Password
          </Typography>
          <TextField
            label="Username or Email"
            type="text"
            value={username}
            onChange={usernameHandler}
            className={classes.textField}
          />
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={newPasswordHandler}
            className={classes.textField}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            onChange={confirmNewPasswordHandler}
            className={classes.textField}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
          >
            Reset Password
          </Button>
          <Link to="/login">Login</Link>
        </form>
      </Paper>
    </div>
  )
}