import React from 'react';
import './ProjectDetailsList.css';

const ProjectDetailsList = ({ projectTasks }) => {

  const incompleteTasks = projectTasks.filter((task) => task.is_completed === 0);
  const completedTasks = projectTasks.filter((task) => task.is_completed === 1);

  return (
    <div className="Project_Details_List">
      <div className="column">
        <h2>Project Information</h2>
        <p><strong>Name:</strong> {projectTasks[0].name}</p>
        <p><strong>Description:</strong> {projectTasks[0].description}</p>
        <p><strong>Due Date:</strong> {projectTasks[0].due_date}</p>
      </div>

      <div className="column uncompleted">
        <h2>Uncompleted tasks</h2>
        {incompleteTasks.length > 0 ? (
          incompleteTasks.map((task) => (
            <p key={task.id}>{task.id}. {task.name}</p>
          ))
        ) : (
          <p>No uncompleted tasks available</p>
        )}
      </div>

      <div className="column completed">
        <h2>Completed tasks</h2>
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <p key={task.id}>{task.id}. {task.name}</p>
          ))
        ) : (
          <p>No completed tasks available</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsList;
