import React, { useState, useEffect, useCallback } from 'react';

export default function ProjectDetails({ selectedProjectId })  {
  const [projectTasks, setProjectDetails] = useState([]);

  const fetchProjectDetails = useCallback(async () => {
    try {
      if (selectedProjectId) { // Check if selectedProjectId is defined
        const response = await fetch(`http://localhost:80/my-taskmanager/papi/get-project-details/${selectedProjectId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
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

  return (
    <div>
      {projectTasks.length > 0 ? (
        <>
          <h1>{projectTasks[0].project_name}</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>User ID</th>
                <th>Is Completed</th>
              </tr>
            </thead>
            <tbody>
              {projectTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td>{task.due_date}</td>
                  <td>{task.user_id ? task.user_id : '-'}</td>
                  <td>{task.is_completed ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
