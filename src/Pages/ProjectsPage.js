import { useState, useEffect, useCallback } from "react";
import PTaskList from "../ProjectsComponents/PTaskList";
import TeamMembers from "../ProjectsComponents/TeamMembers";
import ProjectsList from "../ProjectsComponents/ProjectsList";
import jwt from 'jwt-decode'
import "./ProjectsPage.css";
import ProjectManagement from "../ProjectsComponents/ProjectManagement";
import PTasksManagement from "../ProjectsComponents/PTasksManagement";
import TeamManagement from "../ProjectsComponents/TeamManagement";

export default function ProjectsPage() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectName, setSelectedProjectName] = useState(null);
  
  const [openProjectManagementModal, setOpenProjectManagementModal] = useState(false);
  const [openTeamManagementModal, setOpenTeamManagementModal] = useState(false);
  const [openPTasksManagementModal, setOpenPTasksManagementModal] = useState(false);


  const [teamMembers, setTeamMembers] = useState([]);

  const updateTeamMembers = useCallback((members) => {
    setTeamMembers(members);
  }, []);

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
           <button className="" onClick={() => setOpenProjectManagementModal(true)}>
            Project Management
          </button>
          {openProjectManagementModal && (
              <ProjectManagement onProjectCreated={null} onClose={() => setOpenProjectManagementModal(false)} open={openProjectManagementModal}/>
          )}

          <button className="TeamManagement" onClick={() => setOpenTeamManagementModal(true)}>
            Team Management
          </button>
          {openTeamManagementModal && (
              <TeamManagement onClose={() => setOpenTeamManagementModal(false)} open={openTeamManagementModal} selectedProjectId={selectedProjectId}/>
          )}

          <button className="" onClick={() => setOpenPTasksManagementModal(true)}>
            Project Task Management
          </button>
          {openPTasksManagementModal && (
              <PTasksManagement selectedProjectId={selectedProjectId} onProjectCreated={null} onClose={() => setOpenPTasksManagementModal(false)} open={openPTasksManagementModal}/>
          )}
        </>
      )}

      <div style={{marginTop: "50px", marginBottom: "50px"}}>
        <ProjectsList onProjectSelect={handleProjectSelect}  />
        <h3>Selected Project ID: {selectedProjectId}</h3>
      </div>
      <PTaskList selectedProjectId={selectedProjectId} selectedProjectName={selectedProjectName} teamMembers={teamMembers}/>
      <TeamMembers selectedProjectId={selectedProjectId} onUpdateTeamMembers={updateTeamMembers}/>
    </div>
  );
}
