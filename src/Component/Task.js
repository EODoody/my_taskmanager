import { useState } from 'react';
import EditTask from './EditTask';
import './task.css';

const Task = ({ task, onEdit, }) => {
  const [editMode, setEditMode] = useState(false);
  const [completed, setCompleted] = useState(false);

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

  const handleComplete = () => {
    setCompleted(true);
  };

  return (
    <div className="task-container">
      <div className="card" onClick={handleEdit}>
        <h3>{task.id}. {task.title}</h3>
        {!completed && <button className="done-button" onClick={handleComplete}>Done</button>}
      </div>
      {editMode && (
        <div className="edit-modal-container">
          <EditTask
            open={true}
            onClose={handleClose}
            task={task}
            onEdit={handleTaskEdit}
          />
        </div>
      )}
    </div>
  );
};

export default Task;
