import { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import ProjectDetails from "../ProjectsComponents/ProjectDetails";
import TeamMembers from "../ProjectsComponents/TeamMembers";
//import TeamManagement from "../ProjectsComponents/TeamManagement";
import ProjectsList from "../ProjectsComponents/ProjectsList";
import jwt from 'jwt-decode'
import "./ProjectsPage.css";

export default function ProjectsPage() {

  const [projectDetailsOpen, setProjectDetailsOpen] = useState(false);
  const [teamMembersOpen, setTeamMembersOpen] = useState(false);
  const [teamManagementOpen, setTeamManagementOpen] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    const userToken = jwt(localStorage.getItem("token"));
    
    if (userToken.user.IsAdmin) {
      setIsAdmin(true);
    }
  }, []);

  const handleProjectSelect = (projectId) => {
    setSelectedProjectId(projectId);
  };


  return (
    <div className="Projects_Page">
      
      <h1>Projects Page</h1>

      {isAdmin && (
        <>
          <button className="ProjectDetailsButton" onClick={() => setProjectDetailsOpen(true)}>
            Project Details
          </button>

          <button className="TeamMembersButton" onClick={() => setTeamMembersOpen(true)}>
            Team Members
          </button>

          <button className="TeamManagementButton" onClick={() => setTeamManagementOpen(true)}>
            Team Management
          </button>

          
        </>
      )}

      <div style={{marginTop: "50px"}}>
      <ProjectsList onProjectSelect={handleProjectSelect} />
      <p>Selected Project ID: {selectedProjectId}</p>
      </div>
      <ProjectDetails selectedProjectId={selectedProjectId} open={projectDetailsOpen} onClose={() => setProjectDetailsOpen(false)} />
      <TeamMembers open={teamMembersOpen} onClose={() => setTeamMembersOpen(false)} />
      
      
    </div>
  );
}
