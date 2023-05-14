import { useState, useEffect, useCallback } from "react";
import PTaskList from "../ProjectsComponents/PTaskList";
import TeamMembers from "../ProjectsComponents/TeamMembers";
import ProjectsList from "../ProjectsComponents/ProjectsList";
import jwt from "jwt-decode";
import ProjectManagement from "../ProjectsComponents/ProjectManagement";
import PTasksManagement from "../ProjectsComponents/PTasksManagement";
import TeamManagement from "../ProjectsComponents/TeamManagement";
import { makeStyles } from "@mui/styles";
import { Button, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: theme.spacing(13),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(10),
    flexDirection: "column",
    "& button": {
      margin: theme.spacing(1),
      padding: theme.spacing(2),
      fontWeight: "bold",
      alignItems: "center",
      display: "block",
      marginBottom: theme.spacing(4),
      marginLeft: theme.spacing(7),
      
    },
  },
  listContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    height:"50vh",
    
  },
}));

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





  const handleDeleteProject = (projectId) => {
    // Make an API call to delete the project
    fetch(`http://localhost:80/my-taskmanager/papi/delete-project/${selectedProjectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to delete project");
        }
        window.location.reload(); // Refresh the page
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const classes = useStyles();
return (
  <div className={`Projects_Page ${classes.root}`}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "70%" }}>
        <Typography variant="h3">Project Dashboard</Typography>
        <Typography variant="subtitle1">
          Welcome, {jwt(localStorage.getItem("token")).user.username}!
        </Typography>
        {selectedProjectId ? null : (
          <Typography variant="subtitle2">
            Click on a project row to display more tasks
          </Typography>
        )}
        <ProjectsList onProjectSelect={handleProjectSelect} />
      </div>
      <div style={{ width: "30%", zIndex:"20" }}>
        {isAdmin && (
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => setOpenProjectManagementModal(true)}
            >
              Project Management
            </Button>
            {openProjectManagementModal && (
              <ProjectManagement
                
                onClose={() => setOpenProjectManagementModal(false)}
                open={openProjectManagementModal}
              />
            )}

            <Button
              variant="contained"
              className={classes.button}
              onClick={() => setOpenTeamManagementModal(true)}
            >
              Team Management
            </Button>
            {openTeamManagementModal && (
              <TeamManagement
                onClose={() => setOpenTeamManagementModal(false)}
                open={openTeamManagementModal}
                selectedProjectId={selectedProjectId}
              />
            )}

            <Button
              variant="contained"
              className={classes.button}
              onClick={() => setOpenPTasksManagementModal(true)}
            >
              Project Task Management
            </Button>
            {openPTasksManagementModal && (
              <PTasksManagement
                selectedProjectId={selectedProjectId}
                onProjectCreated={null}
                onClose={() => setOpenPTasksManagementModal(false)}
                open={openPTasksManagementModal}
              />
            )}

            {selectedProjectId && (
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleDeleteProject}
              >
                Delete Project
              </Button>
            )}
          </div>
        )}
      </div>
    </div>

    <div className={classes.listContainer}>
      <PTaskList
        selectedProjectId={selectedProjectId}
        selectedProjectName={selectedProjectName}
        teamMembers={teamMembers}
      />
      <TeamMembers
        selectedProjectId={selectedProjectId}
        onUpdateTeamMembers={updateTeamMembers}
      />
    </div>
  </div>
); }
