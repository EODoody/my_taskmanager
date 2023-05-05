import React, { useState, useEffect, useCallback } from "react";
import HandleAsignTask from "./HandleAsignTask";
import "./PTaskList.css";

export default function ProjectDetails({
  selectedProjectId,
  selectedProjectName,
}) {
  const [projectTasks, setProjectDetails] = useState([]);
  const [openHandleAsignTask, setOpenHandleAsignTask] = useState(false);

  const fetchProjectDetails = useCallback(async () => {
    try {
      if (selectedProjectId) {
        const response = await fetch(
          `http://localhost:80/my-taskmanager/papi/get-project-details/${selectedProjectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setProjectDetails(data);
        } else {
          throw new Error("error");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [selectedProjectId]);

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:80/my-taskmanager/papi/delete-task/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        // Remove the deleted task from the UI by filtering out the task with the matching ID
        setProjectDetails((prevTasks) =>
          prevTasks.filter((task) => task.id !== taskId)
        );
      } else {
        throw new Error("error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCompleteTask = async (task) => {
    try {
      const response = await fetch(
        `http://localhost:80/my-taskmanager/papi/complete-task/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        // Update the task status in the UI
        setProjectDetails((prevTasks) =>
          prevTasks.map((prevTask) =>
            prevTask.id === task.id ? { ...prevTask, is_completed: "1" } : prevTask
          )
        );
      } else {
        throw new Error("error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleAssignTaskClose = () => {
    setOpenHandleAsignTask(false);
    fetchProjectDetails();
  };



  // Filter tasks by completion status and user ID
  const todoTasks = projectTasks.filter(
    (task) => !task.is_completed && !task.user_id
  );
  const inProgressTasks = projectTasks.filter(
    (task) => !task.is_completed && task.user_id
  );
  const completedTasks = projectTasks.filter((task) => task.is_completed);

  return (
    <div className="project-details-container">
      <h1>{selectedProjectName}</h1>

      {projectTasks.length > 0 ? (
        <>
          <div className="tables-container">
            <div className="table-wrapper todo">
              <h2>To Do Project Tasks</h2>
              {todoTasks.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todoTasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>{task.due_date}</td>
                        <td>
                          <button onClick={() => handleDeleteTask(task.id)}>
                            Delete
                          </button>
                          <button onClick={() => setOpenHandleAsignTask(true)}>
                            Asign User
                          </button>
                          {openHandleAsignTask && (
                            <HandleAsignTask
                              taskid={task.id}
                              selectedProjectId={selectedProjectId}
                              onClose={() => handleAssignTaskClose() }
                              open={openHandleAsignTask}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No To Do Project Tasks</p>
              )}
            </div>

            <div className="table-wrapper in-progress">
              <h2>In Progress Tasks</h2>
              {inProgressTasks.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Due Date</th>
                      <th>Asigned to</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inProgressTasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>{task.due_date}</td>
                        <td>{task.user_id}</td>
                        <td>
                          <button onClick={() => handleCompleteTask(task)}>
                            Complete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No In Progress Tasks</p>
              )}
            </div>
            <div className="table-wrapper completed">
              <h2>Completed Tasks</h2>
              {completedTasks.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedTasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>{task.due_date}</td>
                        <td>
                          <button onClick={() => handleDeleteTask(task.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No Completed Tasks</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>No tasks in project</p>
      )}
    </div>
  );
}
