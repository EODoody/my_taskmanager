import React from 'react';

const Task = ({ task }) => {
  if (!task) return null; // check if task prop is undefined

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};

export default Task;