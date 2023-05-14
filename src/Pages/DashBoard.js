import AddTask from "../TasksComponent/AddTask";
import { useState, useEffect, useCallback } from "react";
import TasksList from "../TasksComponent/TasksList";

import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import { Button, Paper, Typography } from "@mui/material";


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
 
  addButton: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: theme.palette.primary.main,
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    
  },
  clearButton: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f1c40f',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    marginLeft: '10px',
    
  },
  goToProject: {
    marginTop: '20px',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    marginLeft: '10px',
    
  },
  tasksManager: {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    border: '1px solid #ccc',
    margin: theme.spacing(2), 
    borderRadius: '5px',
    width: '90%',
  },
  heading: {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    marginTop: "20px",
  },
  addTask: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    marginTop: '20px',
  },
  input: {
    width: '100%',
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  addButtonModal: {
    backgroundColor: theme.palette.primary.main,
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '10px',
  },
}));


export default function DashBoard() {

 
  const [openAddModal, setOpenAddModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  
  const userToken = jwt(localStorage.getItem("token"));
  
  const isProjectPart = userToken && (userToken.user.IsAdmin === 1 || userToken.user.IsPartOfProject === 1);

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
      await fetch('http://localhost:80/my-taskmanager/api/delete-completed-tasks', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const confirmed = window.confirm("Take a last look at all your progress today, GOOD JOB!")
      if(confirmed){
        handleModification(); // update the list of tasks
      }
        
    } catch (error) {
      console.error(error);
      window.alert("You have not completed anything yet")
    }
  }
  
  const showClearCompletedAlert = () => {
    const confirmed = window.confirm("Are you sure you want to delete all completed tasks?");
    if (confirmed) {
      clearCompletedTasks();
    }
  }

  const navigate = useNavigate();

  const goToProjectPage = () => {
    navigate('/projects');
  };



 
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1">User dashboard page</Typography>
      <div style={{ display: "flex", justifyContent: "space-between" }}>

      <Button className={classes.addButton} onClick={() => setOpenAddModal(true)}  variant="outlined" >
      <strong>Add Task +</strong>
      </Button>

      <Button className={classes.clearButton} onClick={() => showClearCompletedAlert()}  variant="outlined">
      <strong>Clear Completed</strong>
      </Button>

      {isProjectPart && (
        <Button className={classes.goToProject} onClick={() => goToProjectPage()}  variant="outlined">
          <strong>Go to project</strong>
        </Button>
      )}
      </div>

    

      <Paper className={classes.tasksManager}>
        <Typography variant="h2" className={classes.heading}>
          Task List:
        </Typography>

        <TasksList tasks={tasks} onEdit={handleModification} onComplete={handleModification} />

        {openAddModal && (
           <AddTask onTaskAdded={handleModification} onClose={() => setOpenAddModal(false)} open={openAddModal} />
        )}
      </Paper>
    </div>
  );
}
