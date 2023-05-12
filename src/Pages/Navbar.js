import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
    marginLeft: "2rem",
  },
  button: {
    flex: 1, // to occupy more space
    alignSelf: "center",
    paddingBottom: "10px",
    marginLeft: "20%",
  },
  paletteModeButton: {
    display: "inline-block",
    marginLeft: "auto",
  },
}));

function Navbar({ authenticated, handleLogout, paletteMode, handleTogglePaletteMode }) {
  const classes = useStyles();

  const menuItems = [
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    ...(authenticated
      ? [
          { label: "Dashboard", path: "/dashboard" },
          { label: "Profile", path: "/profile" },
          { label: "Logout", onClick: handleLogout },
        ]
      : [
          { label: "Login", path: "/login" },
          { label: "Sign Up", path: "/signup" },
        ]),
  ];

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link to="/" className={classes.link}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: "#fff" }}>
          <img src={require('../Pages/image.jpg')} alt="Logo" style={{ height: '40px' }} />Day-o
          </Typography>
        </Link>

        <ul className={classes.nav__links}>
          {menuItems.map((menuItem, index) => (
            <li key={index} style={{ display: "inline-block", marginLeft: "1rem" }}>
              {menuItem.onClick ? (
                <Button color="inherit" style={{ color: "#fff" }} sx={{ fontSize: "1.2rem" }} className={classes.button} onClick={menuItem.onClick}>
                  {menuItem.label}
                </Button>
              ) : (
                <Link to={menuItem.path} style={{ textDecoration: "none" }}>
                  <Button color="inherit" style={{ color: "#fff" }} sx={{ fontSize: "1.2rem" }} className={classes.button}>
                    {menuItem.label}
                  </Button>
                </Link>
              )}
            </li>
          ))}

          <li className={classes.paletteModeButton}>
            <IconButton color="inherit" onClick={handleTogglePaletteMode}>
              <Switch checked={paletteMode === "dark"} inputProps={{ "aria-label": "Toggle dark mode" }} />
            </IconButton>
            <Typography variant="body1" color="inherit" sx={{ marginLeft: "0.5rem" }}>
              {paletteMode === "dark" ? "Dark Mode" : "Light Mode"}
            </Typography>
          </li>
        </ul>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
