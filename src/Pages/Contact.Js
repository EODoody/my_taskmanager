import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "fixed",
    top: 0,
    backgroundImage: theme.palette.background.default,
    zIndex: -1,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
  },
  paper: {
    padding: theme.spacing(3),
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "10px",
    border: `1px solid ${theme.palette.grey[300]}`,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  },
  formControl: {
    marginBottom: theme.spacing(2),
    width: "100%",
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "100%",
    borderRadius: "20px",
    padding: theme.spacing(2),
    fontWeight: "bold",
  },
}));

export default function Contact() {
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    //Not just decent looking page here nothing else to see
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <form style={{margin: "8px 9px 10px"}} onSubmit={handleSubmit}>
          <Typography variant="h4" align="center" gutterBottom>
            Contact Us
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            gutterBottom
            style={{ marginTop: "20px" }}
          >
            The owner of this web application is{" "}
            <strong>Olteanu David-Eduard</strong>. We believe that we should not
            have garbage in our lives, for if we have it, our outputs won't be
            better than it.
          </Typography>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input id="name" aria-describedby="name-helper-text" />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input id="email" aria-describedby="email-helper-text" />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="message">Message</InputLabel>
            <Input
              id="message"
              multiline
              rows={4}
              aria-describedby="message-helper-text"
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  );
}
