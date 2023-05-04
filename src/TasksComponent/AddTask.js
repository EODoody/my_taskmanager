import Modal from "../Pages/Modal"
import {useState} from 'react'
import "./AddTask.css"



function AddTask({onClose, open, onTaskAdded}) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  async function AddTaskRequest(){

    const bearer_token = localStorage.getItem('token');
    try{
      await fetch('http://localhost:80/my-taskmanager/api/add-task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearer_token}`
      },
      body: JSON.stringify({
        title: title,
        description: description
      })
    });
    onTaskAdded();
    }
    
    catch (error) {
      console.log(error.message)
    }
  }
  
   const submitHandler = async (event) => {
    event.preventDefault()
    AddTaskRequest()
  }


  return (
    <Modal modalLable='Add Task' onClose={onClose} open={open}>
    <form onSubmit={submitHandler} className='addTask' name='addTask'>
      <input 
        type='text' 
        name='title' 
        onChange={(e) => setTitle(e.target.value.toUpperCase())} 
        value={title}
        placeholder='Enter title'
        maxLength="30"/>
      <textarea 
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Enter task decription'
        value={description}
        maxLength="254"></textarea>
      <button type='submit'>Done</button>
    </form> 
  </Modal>
  )
}


export default AddTask