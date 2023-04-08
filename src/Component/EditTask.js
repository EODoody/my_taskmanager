import Modal from "./Modal"
import { useState } from 'react'
import "./EditTask.css"


function EditTask({ onClose, open, task, onEdit }) {

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)

  async function editTaskRequest() {
    const bearer_token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:80/my-taskmanager/api/edit-task/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearer_token}`
        },
        body: JSON.stringify({
          title: title,
          description: description
        })
      });
    }
    catch (error) {
      console.log(error.message)
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    await editTaskRequest()
    //onEdit({ ...task, title, description })
    onClose()
  }

  return (
    <Modal modalLable='Edit Task' onClose={onClose} open={open}>
      <form onSubmit={submitHandler} className='editTask' name='editTask'>
        <input
          type='text'
          name='title'
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
          placeholder='Enter title' />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter task decription'
          value={description}></textarea>
        <button type='submit'>Submit</button>
      </form>
    </Modal>
  )
}

export default EditTask
