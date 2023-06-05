import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    marginLeft: "rem",
  },
  accent: {
    color: theme.palette.secondary.main,
  },
  button: {
    alignSelf: "center",
    paddingBottom: "10px",
    marginLeft: "20%",
  },
  paletteModeButton: {
    display: "inline-block",
    marginLeft: "auto",
  },
}));

function Navbar({
  authenticated,
  handleLogout,
  paletteMode,
  handleTogglePaletteMode,
}) {
  const classes = useStyles();

  const [isDarkMode, setIsDarkMode] = useState();

  const handleTogglePaletteModeAndsetIsDarkMode = () => {
    handleTogglePaletteMode(); // Call the first function
    setIsDarkMode(!isDarkMode);
    // ...
  };

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
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent !important",
        boxShadow: "none",
        marginBottom: "25px",
      }}
    >
      <Toolbar
        className={classes.toolbar}
        sx={{ justifyContent: "space-between" }}
      >
        <Link to="/" className={classes.link}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            <strong>
              DAY-<span className={classes.accent}>O</span>
            </strong>
          </Typography>
        </Link>

        <ul>
          {menuItems.map((menuItem, index) => (
            <li
              key={index}
              style={{ display: "inline-block", marginLeft: "1rem" }}
            >
              {menuItem.onClick ? (
                <Button
                  sx={{ fontSize: "1.4rem" }}
                  className={classes.button}
                  onClick={menuItem.onClick}
                >
                  <strong>{menuItem.label}</strong>
                </Button>
              ) : (
                <Link to={menuItem.path}>
                  <Button
                    sx={{ fontSize: "1.4rem" }}
                    className={classes.button}
                  >
                    <strong>{menuItem.label}</strong>
                  </Button>
                </Link>
              )}
            </li>
          ))}

          <li className={classes.paletteModeButton} style={{marginLeft:"20px"}}>
            <IconButton
              color="inherit"
              onClick={handleTogglePaletteModeAndsetIsDarkMode}
            >
              {localStorage.getItem("paletteMode")==="dark" ? (
                // Render the dark mode picture
                <img src={require('../Images/sunpictogram.png')} alt="Dark Mode" />
              ) : (
                // Render the light mode picture
                <img src={require('../Images/moonimage.png')} alt="Light Mode" />
              )}
              
            </IconButton>
          </li>
        </ul>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
