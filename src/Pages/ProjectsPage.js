import { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import ProjectDetails from "../ProjectsComponents/ProjectDetails";
import TeamMembers from "../ProjectsComponents/TeamMembers";
//import TeamManagement from "../ProjectsComponents/TeamManagement";
import ProjectsList from "../ProjectsComponents/ProjectsList";
import jwt from 'jwt-decode'
import "./ProjectsPage.css";

export default function ProjectsPage() {


  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectName, setSelectedProjectName] = useState(null);

  useEffect(() => {
    const userToken = jwt(localStorage.getItem("token"));
    if (userToken.user.IsAdmin) {
      setIsAdmin(true);
    }
  }, []);

  const handleProjectSelect = (projectId, projectName) => {
    setSelectedProjectId(projectId);
    setSelectedProjectName(projectName);
  };


  return (
    <div className="Projects_Page">
      
      <h1>Projects Page</h1>

      {isAdmin && (
        <>
          <button className="ProjectManagement">
            Project Management
          </button>

          <button className="TeamManagement" >
            Team Management
          </button>

          <button className="PTasksManagement" >
            Project Tasks Management
          </button>
        </>
      )}

      <div style={{marginTop: "50px", marginBottom: "50px"}}>
      <ProjectsList onProjectSelect={handleProjectSelect} />
      <p>Selected Project ID: {selectedProjectId}</p>
      </div>
      <ProjectDetails selectedProjectId={selectedProjectId} selectedProjectName={selectedProjectName} />
      <TeamMembers selectedProjectId={selectedProjectId} />
      
      
    </div>
  );
}
