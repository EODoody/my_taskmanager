import React from 'react';
import { makeStyles } from '@mui/styles';
import Task from './Task';


const useStyles = makeStyles((theme) => ({
  Tasks_List: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  
  column: {
    width: '50%',
    height: '650px',
    overflowY: 'auto',
    padding: '16px',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '4px',
  },
  
  uncompleted: {
    backgroundColor: 'rgb(234, 142, 167)',
    marginRight: '5px',
  },
  
  completed: {
    backgroundColor: 'rgb(86, 200, 172)',
    marginLeft: '5px',
  },
  
  columnHover: {
    borderColor: theme.palette.primary.main,
  },
  
  columnActive: {
    outline: 'none',
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
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
