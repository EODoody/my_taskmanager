import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Paper
} from '@mui/material';
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    height: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  },
  form: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  formControl: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '100%',
    borderRadius: '20px',
    padding: theme.spacing(2),
    fontWeight: 'bold',
  },
  alternateAction: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  },
  alternateActionLink: {
    marginLeft: theme.spacing(3),
    fontWeight: 'bold',
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
}));


export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isPartOfProject, setIsPartOfProject] = useState(0);

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const mobileHandler = (event) => {
    setMobile(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const isPartOfProjectHandler = (event) => {
    setIsPartOfProject(event.target.checked ? 1 : 0);
  };

  async function registerRequest() {
    try {
      await fetch("http://localhost:80/my-taskmanager/api/register", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          email: email,
          mobile: mobile,
          password: password,
          isPartOfProject: isPartOfProject,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("error");
        })
        .then((data) => {
          if (data.status) {
            localStorage.setItem("token", data.status);
            navigate("/confirm");
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
    registerRequest();
  };


  const classes= useStyles();

  return (
    <div className={classes.root}>
    <Paper className={classes.paper} elevation={3}>
    <Typography variant="h4" component="h1" align="center" gutterBottom>
    Create an account
    </Typography>
    <form className={classes.form} onSubmit={submitHandler}>
    <TextField
           label="Username"
           variant="outlined"
           fullWidth
           value={username}
           onChange={usernameHandler}
           margin="normal"
         />
    <TextField
           label="Email"
           variant="outlined"
           fullWidth
           value={email}
           onChange={emailHandler}
           margin="normal"
         />
    <TextField
           label="Mobile"
           variant="outlined"
           fullWidth
           value={mobile}
           onChange={mobileHandler}
           margin="normal"
         />
    <TextField
           label="Password"
           type="password"
           variant="outlined"
           fullWidth
           value={password}
           onChange={passwordHandler}
           margin="normal"
         />
    <FormControlLabel
    control={
    <Checkbox
               checked={isPartOfProject}
               onChange={isPartOfProjectHandler}
               name="part-of-project"
             />
    }
    label="Part of project"
    />
    <Button variant="contained" type="submit" color="primary" fullWidth>
    Create account
    </Button>
    </form>
    <div className={classes.alternateAction}>
    <Link className="alternate-action-link" to="/login">Already have an account? Log in Page</Link>
    </div>
    </Paper>
    </div>
    );
    }