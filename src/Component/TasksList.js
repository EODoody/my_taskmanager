import React from 'react';
import Task from './Task';
import './TaskList.css';

const TasksList = ({ tasks, onEdit }) => {

  const uncompletedTasks = tasks.filter((task) => task.status === 0);
  const completedTasks = tasks.filter((task) => task.status === 1);

  return (
    <div className="Tasks_List">
      <div className="column uncompleted">
        <h2>Uncompleted tasks</h2>
        {uncompletedTasks.length > 0 ? (
          uncompletedTasks.map((task) => (
            <Task key={task.id} task={task} onEdit={onEdit} />
          ))
        ) : (
          <p>No uncompleted tasks available</p>
        )}
      </div>
      
      <div className="column completed">
        <h2>Completed tasks</h2>
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <Task key={task.id} task={task} onEdit={onEdit} />
          ))
        ) : (
          <p>No completed tasks available</p>
        )}
      </div>
    </div>
  );
};

export default TasksList;