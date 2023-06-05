import React, { useState } from 'react';
import Modal from '../Pages/Modal';
//import './ProjectManagement.css';

function ProjectManagement({ onClose, open, onProjectCreated }) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  async function CreateProject(){
    try{
      const response = await fetch('http://localhost:80/my-taskmanager/papi/create-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          name: name,
          description: description,
          start_date: startDate,
          end_date: endDate
        })
      });
      const newProject = await response.json();
      onProjectCreated(newProject);
      
    }
    catch (error) {
      console.log(error.message)
    }
    window.location.reload(); // Refresh the page
  }
  
   const submitHandler = async (event) => {
    event.preventDefault()
    CreateProject()
    onClose();
  }

  return (
    <Modal modalLable='Add Project' onClose={onClose} open={open}>
      <form onSubmit={submitHandler} className='addTask' name='addTask'>
        <p>Project Name</p>
        <input 
          type='text' 
          name='name' 
          onChange={(e) => setName(e.target.value.toUpperCase())} 
          value={name}
          placeholder='Enter project name'
          maxLength="30"/>
          <p>Project description</p>
        <textarea 
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter project description'
          value={description}
          maxLength="254"></textarea>
          <p>Project Start Date</p>
        <input 
          type='date' 
          name='start_date' 
          onChange={(e) => setStartDate(e.target.value)} 
          value={startDate}/>
          <p>Project End Date</p>
        <input 
          type='date' 
          name='end_date' 
          onChange={(e) => setEndDate(e.target.value)} 
          value={endDate}/>
          
        <button type='submit'>Create Project</button>
      </form> 
    </Modal>
  );
}

export default ProjectManagement;
