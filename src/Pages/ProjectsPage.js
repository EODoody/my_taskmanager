import { useState, useEffect, useCallback } from "react";
import PTaskList from "../ProjectsComponents/PTaskList";
import TeamMembers from "../ProjectsComponents/TeamMembers";
import ProjectsList from "../ProjectsComponents/ProjectsList";
import jwt from 'jwt-decode'
import ProjectManagement from "../ProjectsComponents/ProjectManagement";
import PTasksManagement from "../ProjectsComponents/PTasksManagement";
import TeamManagement from "../ProjectsComponents/TeamManagement";
import { makeStyles } from "@mui/styles";



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    marginTop: "5%",
    height: '88vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    borderRadius: '20px',
    padding: theme.spacing(2),
    fontWeight: 'bold',
    alignItems: 'center',
  },
  listContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));


export default function ProjectsPage() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectName, setSelectedProjectName] = useState(null);
  const [openProjectManagementModal, setOpenProjectManagementModal] = useState(false);
  const [openTeamManagementModal, setOpenTeamManagementModal] = useState(false);
  const [openPTasksManagementModal, setOpenPTasksManagementModal] = useState(false);

  const classes = useStyles();

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
    <div className={`Projects_Page ${classes.root}`}>
      <h1>Projects Page</h1>
      {isAdmin && (
        <>
           <button className={classes.button} onClick={() => setOpenProjectManagementModal(true)}>
            Project Management
          </button>
          {openProjectManagementModal && (
              <ProjectManagement onProjectCreated={null} onClose={() => setOpenProjectManagementModal(false)} open={openProjectManagementModal}/>
          )}

          <button className={classes.button} onClick={() => setOpenTeamManagementModal(true)}>
            Team Management
          </button>
          {openTeamManagementModal && (
              <TeamManagement onClose={() => setOpenTeamManagementModal(false)} open={openTeamManagementModal} selectedProjectId={selectedProjectId}/>
          )}

          <button className={classes.button} onClick={() => setOpenPTasksManagementModal(true)}>
            Project Task Management
          </button>
          {openPTasksManagementModal && (
              <PTasksManagement selectedProjectId={selectedProjectId} onProjectCreated={null} onClose={() => setOpenPTasksManagementModal(false)} open={openPTasksManagementModal}/>
          )}
        </>
      )}

      <div className={classes.listContainer}>
        <ProjectsList onProjectSelect={handleProjectSelect}  />
        <h3>Selected Project ID: {selectedProjectId}</h3>
      </div>
      <PTaskList selectedProjectId={selectedProjectId} selectedProjectName={selectedProjectName} teamMembers={teamMembers}/>
      <TeamMembers selectedProjectId={selectedProjectId} onUpdateTeamMembers={updateTeamMembers}/>
    </div>
  );
}
