import React from 'react';
import { makeStyles } from '@mui/styles';
import Task from './Task';


const useStyles = makeStyles((theme) => ({
  Tasks_List: {
    color: theme.palette.primary.main,
    zIndex: -1,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundImage: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    width: '50%',
    minHeight: "500px",
    maxHeight:"500px",
    overflowY: 'auto',
    padding: '20px',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
    
   
    
  },
  
  uncompleted: {
    backgroundColor: 'rgba(25,167,206,0.7)',
    marginRight: '20px',
    boxShadow: `7px -5px rgba(20,108,148,0.8)`,
  },
  
  completed: {
    backgroundColor: 'rgba(232,160,191, 0.7)',
    marginLeft: '20px',
    boxShadow: `7px -5px rgba(186,144,198,0.8)`,
    
  },
  
}));

const TasksList = ({ tasks, onEdit, onComplete }) => {
  const classes = useStyles();

  const uncompletedTasks = tasks.filter((task) => task.status === 0);
  const completedTasks = tasks.filter((task) => task.status === 1);

  return (
    <div className={classes.Tasks_List}>
      <div className={`${classes.column} ${classes.uncompleted}`}>
        <h2>Uncompleted tasks</h2>
        {uncompletedTasks.length > 0 ? (
          uncompletedTasks.map((task) => (
            <Task key={task.id} task={task} onEdit={onEdit} onComplete={onComplete} />
          ))
        ) : (
          <p>No uncompleted tasks available</p>
        )}
      </div>
      
      <div className={`${classes.column} ${classes.completed}`}>
        <h2>Completed tasks</h2>
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <Task key={task.id} task={task} onEdit={onEdit} onComplete={onComplete}/>
          ))
        ) : (
          <p>No completed tasks available</p>
        )}
      </div>
    </div>
  );
};

export default TasksList;
