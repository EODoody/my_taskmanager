import { useState } from 'react';
import EditTask from './EditTask';
import './task.css';

const Task = ({ task, onEdit }) => {
  const [editMode, setEditMode] = useState(false);

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

  return (
    <div className="task-container">
      <div className="card" onClick={handleEdit}>
        <h3>{task.id}. {task.title}</h3>
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
