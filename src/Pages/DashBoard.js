import AddTask from "../Component/AddTask"
import { useState } from "react"
//import ReactModal from "react-modal"



export default function DashBoard() {
  const [openAddModal, setOpenAddModal] = useState(false)
  return (

    
    <div> User dashboard page

        <button 
          onClick={() => setOpenAddModal(true)}>
          Add task +
        </button>
      <div>

    
        {openAddModal &&
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal}/>
        }
      </div>
    </div>
  )
}