import React, { useState, useEffect, useCallback } from "react";
import './ProjectDetails.css'


export default function ProjectDetails({
  selectedProjectId,
  selectedProjectName,
}) {
  const [projectTasks, setProjectDetails] = useState([]);

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
                      <th>User ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inProgressTasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>{task.due_date}</td>
                        <td>{task.user_id}</td>
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
                      <th>User ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedTasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>{task.due_date}</td>
                        <td>{task.user_id}</td>
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
