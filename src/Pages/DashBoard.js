import AddTask from "../Component/AddTask"
import { useState, useEffect, useCallback } from "react"
import Task from '../Component/Task'

//import ReactModal from "react-modal"

export default function DashBoard() {

 
  const [openAddModal, setOpenAddModal] = useState(false)
  const [tasks, setTasks] = useState([])

  const fetchData = useCallback(async () => {
    try {
       await fetch(`http://localhost:80/my-taskmanager/api/get-tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('error')
      })
      .then((data) => {
        console.log(data)
        setTasks(data)
      })
        
      } 
      catch (error) {
        console.log(error.message)
      } }, []);
      

    useEffect(() => {
      fetchData();
  }, [fetchData]);

  return (
    <div className="Tasks_Page"> User dashboard page

        <button 
          onClick={() => setOpenAddModal(true)}>
          Add task +
        </button>
     <div className="Tasks_manager">
        {tasks.length > 0 ?
          tasks.map((task) => (
            <Task
              id={task.id}
              key={task.id}
              completed={task.data.completed}
              title={task.data.title} 
              description={task.data.description}
            />
          ))
        :
          <p>No tasks available</p>
        }
      </div>
      <div>
        {openAddModal &&
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal}/>
        }
      </div>
    </div>
  )
  }
