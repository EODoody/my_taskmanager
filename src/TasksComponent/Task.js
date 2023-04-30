import { useState } from 'react';
import EditTask from './EditTask';
import './task.css';

const Task = ({ task, onEdit, onComplete}) => {
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

  const handleComplete = async () => {
    try {
      const bearer_token = localStorage.getItem('token');
      // Make an API call to update the task's status
      const response = await fetch(`http://localhost:80/my-taskmanager/api/status-update/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearer_token}`
        },
        body: JSON.stringify({ status: 1 })
      });
      
      if (response.ok) {
        setCompleted(true)
        onComplete(task);
      } else {
        console.error('Failed to update task status');
      }
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  return (
    <div className={`task-container ${completed ? 'completed' : ''}`}>
      <div className="card" onClick={handleEdit}>
        <h3>{task.id}. {task.title}</h3>
        
        {!task.status && <br style={{marginLeft:'20px'}}></br> && <button className="done-button" onClick={handleComplete}>Done</button>}
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