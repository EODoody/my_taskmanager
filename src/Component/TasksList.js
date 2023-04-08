import React from 'react';
import Task from './Task';

const TasksList = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TasksList;