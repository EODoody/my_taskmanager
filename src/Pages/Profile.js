import { Link } from "react-router-dom";
import jwt from "jwt-decode";

import { Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

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
  heading: {
    marginBottom: "24px",
    fontWeight: "bold",
    fontSize: "32px",
    color: "#42a5f5",
  },
  paper: {
    padding: "24px",
    marginBottom: "24px",
  },
  userInfo: {
    marginBottom: "16px",
    lineHeight: "1.6",
  },
  label: {
    fontWeight: "bold",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const userToken = jwt(localStorage.getItem("token"));

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.heading}>
        Profile
      </Typography>
      <Typography variant="h4" className={classes.heading}>
        User Information
      </Typography>
      {userToken && (
        <Paper elevation={3} className={classes.paper}>
          <div className={classes.userInfo}>
            <Typography variant="body1" className={classes.label}>
              Username:
            </Typography>
            <Typography variant="body1">{userToken.user.username}</Typography>
          </div>
          <div className={classes.userInfo}>
            <Typography variant="body1" className={classes.label}>
              Email:
            </Typography>
            <Typography variant="body1">{userToken.user.email}</Typography>
          </div>
          <div className={classes.userInfo}>
            <Typography variant="body1" className={classes.label}>
              Mobile Number:
            </Typography>
            <Typography variant="body1">
              {userToken.user.mobile || "N/A"}
            </Typography>
          </div>
          <div className={classes.userInfo}>
            <Typography variant="body1" className={classes.label}>
              Account Created On:
            </Typography>
            <Typography variant="body1">
              {userToken.user.created_date}
            </Typography>
          </div>
          <div className={classes.userInfo}>
            <Typography variant="body1" className={classes.label}>
              Admin Status:
            </Typography>
            <Typography variant="body1">
              {userToken.user.IsAdmin ? "Yes" : "No"}
            </Typography>
          </div>
          <div className={classes.userInfo}>
            <Typography variant="body1" className={classes.label}>
              Part of Project:
            </Typography>
            <Typography variant="body1">
              {userToken.user.IsPartOfProject ? "Yes" : "No"}
            </Typography>
          </div>
        </Paper>
      )}
      
    </div>
  );
}
