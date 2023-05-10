import { Button, Paper, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  paper: {
    padding: theme.spacing(2),
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function AccountConfirm() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const classes = useStyles();
  const codeHandler = (event) => {
    setCode(event.target.value);
  };

  async function confirmRequest() {
    try {
      await fetch("http://localhost:80/my-taskmanager/api/confirm", {
        method: "POST",
        body: JSON.stringify({
          code: code,
        }),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((respose) => {
          if (respose.ok) {
            return respose.json();
          }
          throw new Error("error");
        })
        .then((data) => {
          if (data.status === 1) {
            navigate("/");
          } else {
            //set error
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    confirmRequest();
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Paper className={classes.paper} elevation={3}>
      <Typography variant="h2" className={classes.title}>
        Confirm Code
      </Typography>
      <TextField
        type="text"
        value={code}
        onChange={codeHandler}
        className={classes.textField}
        label="Code"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Confirm
      </Button>
      </Paper>
    </form>
  );
}
