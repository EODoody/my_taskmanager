import React, { useState } from 'react';
import Modal from '../Pages/Modal';

function ProjectTasksManagement({ onClose, open, selectedProjectId, onProjectTaskCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  async function createProjectTask() {
    try {
      await fetch(`http://localhost:80/my-taskmanager/papi/ProjectAdd-tasks/${selectedProjectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          project_id: selectedProjectId,
          name: name,
          description: description,
          due_date: dueDate
        })
      });
      onProjectTaskCreated();
    } catch (error) {
      console.log(error.message)
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    createProjectTask();
    onClose();
  }

  return (
    <Modal modalLable='Project Task Management' onClose={onClose} open={open}>
      <h4>selectedProjectId: {selectedProjectId}</h4>
      <form onSubmit={submitHandler} className='addTask' name='addTask'>
        <input
          type='text'
          name='name'
          onChange={(e) => setName(e.target.value.toUpperCase())}
          value={name}
          placeholder='Enter task name'
          maxLength='50'
          required
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter task description'
          value={description}
          maxLength='255'
          required
        ></textarea>
        <p>Due Date</p>
        <input
          type='date'
          name='due_date'
          onChange={(e) => setDueDate(e.target.value)}
          value={dueDate}
          required
        />
        <button type='submit'>Create Project Task</button>
      </form>
    </Modal>
  );
}

export default ProjectTasksManagement;
