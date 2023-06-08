import { useState } from 'react';
import EditTask from './EditTask';

import { Button, Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  taskContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
    backgroundColor: "#fff",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    zIndex: 1, 
  },
  completed: {
    backgroundColor: "#f5f5f5",
  },
  card: {
    cursor: "pointer",
    minWidth: theme.spacing(50),
  },
  
  

}));

const Task = ({ task, onEdit, onComplete}) => {
  const [editMode, setEditMode] = useState(false);
  const [completed, setCompleted] = useState(false);
  const classes = useStyles();

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleClose = () => {
    setEditMode(false);
  };
  const handleTaskEdit = async () => {
    await onEdit();
    handleClose();
  };

  const handleComplete = async () => {
    try {
      const bearer_token = localStorage.getItem('token');
      // Make an API call to update the task's status
      const response = await fetch(`http://localhost:80/my-taskmanager/api/status-update/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearer_token}`
        },
        body: JSON.stringify({ status: 1 })
      });
      
      if (response.ok) {
        setCompleted(true)
        onComplete(task);
        console.log(completed)
      } else {
        console.error('Failed to update task status');
      }
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  return (
    <div className={`${classes.taskContainer} ${task.status ? classes.completed : ''}`}>
      
    <Card className={classes.card} onClick={task.status ? null : handleEdit}>
    <CardContent style={{display:"flex"}}>
      <Typography variant="h5" component="h2">
        {task.id}. {task.title}
      </Typography>
    </CardContent>
  </Card>
  {!task.status && (
      <Button
        className={classes.doneButton}
        variant='outlined'
        color="primary"
        onClick={handleComplete}
      >
        Done
      </Button>
    )}
 
 
  <div style={{zIndex:"20"}}>
  {editMode && (
      <EditTask
        open={true}
        onClose={handleClose}
        task={task}
        onEdit={handleTaskEdit}
      />
  )}
  </div>
  </div>

  );
};

export default Task;