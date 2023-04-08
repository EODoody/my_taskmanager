import React from 'react';

const Task = ({ task }) => {
  if (!task) return null; // check if task prop is undefined

  return (
    <div>
      <h3>ID: {task.id} - Title: {task.title}</h3>
      <div>
        <p>Description: {task.description}</p>
        <p>Task status: {task.status} </p>
      </div>
      
    </div>
  );
};

export default Task;