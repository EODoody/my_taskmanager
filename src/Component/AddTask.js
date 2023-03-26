import Modal from "./Modal"
import {useState} from 'react'
import "./AddTask.css"


function AddTask({onClose, open}) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const submitHandler = async (event) => {
    event.preventDefault()
  
    const bearer_token = localStorage.getItem('jwt')
  
    const response = await fetch('https://yourapi.com/add-task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearer_token}`
      },
      body: JSON.stringify({
        title: title,
        description: description
      })
    })
  
    if (response.ok) {
      const newTask = await response.json()
      // Do something with the new task, such as add it to the task list
    } else {
      console.error('Failed to add task')
    }
  }


  return (
    <Modal modalLable='Add Task' onClose={onClose} open={open}>
    <form onSubmit={submitHandler} className='addTask' name='addTask'>
      <input 
        type='text' 
        name='title' 
        onChange={(e) => setTitle(e.target.value.toUpperCase())} 
        value={title}
        placeholder='Enter title'/>
      <textarea 
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Enter task decription'
        value={description}></textarea>
      <button type='submit'>Done</button>
    </form> 
  </Modal>
  )
}

export default AddTask