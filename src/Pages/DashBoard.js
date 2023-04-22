import AddTask from "../Component/AddTask";
import { useState, useEffect, useCallback } from "react";
import TasksList from "../Component/TasksList";
import "./Dashboard.css";
import jwt from 'jwt-decode'

export default function DashBoard() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  
  const userToken = jwt(localStorage.getItem("token"));
  const isProjectPart = userToken && (userToken.user.IsAdmin === 1 || userToken.user.IsPartOfProject === 1);

  const fetchData = useCallback(async () => {
    try {
      await fetch(`http://localhost:80/my-taskmanager/api/get-tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("error");
        })
        .then((data) => {
          console.log(data);
          setTasks(data);
        });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleModification = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const clearCompletedTasks = async () => {
    try {
      await fetch('http://localhost:80/my-taskmanager/api/delete-completed-tasks', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const confirmed = window.confirm("Take a last look at all your progress today, GOOD JOB!")
      if(confirmed){
        handleModification(); // update the list of tasks
      }
        
    } catch (error) {
      console.error(error);
      window.alert("You have not completed anything yet")
    }
  }
  
  const showClearCompletedAlert = () => {
    const confirmed = window.confirm("Are you sure you want to delete all completed tasks?");
    if (confirmed) {
      clearCompletedTasks();
    }
  }

  const goToProjectPage = () => {};

  return (
    <div className="Tasks_Page">
      <h1>User dashboard page</h1>

      <button className="AddButton" onClick={() => setOpenAddModal(true)}>
        Add task +
      </button>

      <button className="ClearButton" onClick={() => showClearCompletedAlert()}>
        Clear completed
      </button>

      {isProjectPart && (
        <button className="GoToProject" onClick={() => goToProjectPage()}>
          Go to project
        </button>
      )}
      <br></br>
      <div className="Tasks_Manager">
        <h2> To doos: </h2>
        <TasksList tasks={tasks} onEdit={handleModification} onComplete={handleModification} />
        {openAddModal && (
          <AddTask onTaskAdded={handleModification} onClose={() => setOpenAddModal(false)} open={openAddModal} />
        )}
      </div>
    </div>
  );
}
