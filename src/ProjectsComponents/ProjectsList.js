import React, { useState, useEffect } from "react";

export default function ProjectList({ onProjectSelect }) {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only fetch projects if isAdmin value has been set

    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:80/my-taskmanager/papi/get-projects`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (!response.ok) {
          throw new Error("Unable to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (projectId, projectName) => {
    setSelectedProjectId(projectId);
    onProjectSelect(projectId, projectName);
  };

  return (
    <div>
      <h2>Projects List</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                onClick={() => handleProjectClick(project.id, project.name)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    project.id === selectedProjectId ? "lightblue" : "#f5f5f5",
                }}
              >
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.start_date}</td>
                <td>{project.end_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
