import AddTask from "../TasksComponent/AddTask";
import { useState, useEffect, useCallback } from "react";
import TasksList from "../TasksComponent/TasksList";

import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Button, Paper, Typography } from "@mui/material";

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
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
    
  },
  accent: {
    color: theme.palette.secondary.main,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "50%",
    marginTop: theme.spacing(2),
  padding: "10px",
  backgroundColor: theme.palette.background.default,
  borderRadius: "5px",
 
  },
  tasksManager: {
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    boxshadow: "5px 10px #888888",
    margin: theme.spacing(2),
    borderRadius: "20px",
    width: "80%",
    
  },
  heading: {
    color: theme.palette.primary.main,
    marginTop: "20px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: theme.palette.background.default,
  },
}));

export default function DashBoard() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const userToken = jwt(localStorage.getItem("token"));

  const isProjectPart =
    userToken &&
    (userToken.user.IsAdmin === 1 || userToken.user.IsPartOfProject === 1);

  const fetchData = useCallback(async () => {
    try {
      await fetch(`http://localhost:80/my-taskmanager/api/get-tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("error");
        })
        .then((data) => {
          console.log(data);
          setTasks(data);
        });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleModification = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const clearCompletedTasks = async () => {
    try {
      await fetch(
        "http://localhost:80/my-taskmanager/api/delete-completed-tasks",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const confirmed = window.confirm(
        "Take a last look at all your progress today, GOOD JOB!"
      );
      if (confirmed) {
        handleModification(); // update the list of tasks
      }
    } catch (error) {
      console.error(error);
      window.alert("You have not completed anything yet");
    }
  };

  const showClearCompletedAlert = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all completed tasks?"
    );
    if (confirmed) {
      clearCompletedTasks();
    }
  };

  const navigate = useNavigate();

  const goToProjectPage = () => {
    navigate("/projects");
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Typography sx={{marginTop:"20vh" , alignItems:'start'}} variant="h2">USER <span className={classes.accent}>DASHBOARD</span> </Typography>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            onClick={() => setOpenAddModal(true)}
            variant="outlined"
          >
            <strong>Add Task +</strong>
          </Button>

          <Button
            className={classes.button}
            onClick={() => showClearCompletedAlert()}
            variant="outlined"
          >
            <strong>Clear Completed</strong>
          </Button>

          {isProjectPart && (
            <Button
              className={classes.button}
              onClick={() => goToProjectPage()}
              variant="outlined"
            >
              <strong>Go to project</strong>
            </Button>
          )}
        </div>

        <Paper className={classes.tasksManager}>
          <Typography variant="h3" className={classes.heading}>
            Task List:
          </Typography>

          <TasksList
            tasks={tasks}
            onEdit={handleModification}
            onComplete={handleModification}
          />

          {openAddModal && (
            <AddTask
              onTaskAdded={handleModification}
              onClose={() => setOpenAddModal(false)}
              open={openAddModal}
            />
          )}
        </Paper>
      </div>
  
  );
}
