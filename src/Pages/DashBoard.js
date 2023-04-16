import AddTask from "../Component/AddTask";
import { useState, useEffect, useCallback } from "react";
import TasksList from "../Component/TasksList";
import "./Dashboard.css";

export default function DashBoard() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const isProjectPart = true;

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

  const clearCompletedTasks = () => {};

  const goToProjectPage = () => {};

  return (
    <div className="Tasks_Page">
      User dashboard page
      <button className="AddButton" onClick={() => setOpenAddModal(true)}>
        Add task +
      </button>
      <button className="ClearButton" onClick={() => clearCompletedTasks()}>
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
