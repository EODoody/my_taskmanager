import React from 'react';
import Task from './Task';

const TasksList = ({ tasks, onEdit }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task onEdit={onEdit} key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TasksList;