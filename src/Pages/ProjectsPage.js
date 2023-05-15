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
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    overflow: "auto", 
  },
  backgroundImage: {
    position: "fixed",
    top: 0,
    backgroundImage: theme.palette.background.default,
    zIndex: -1,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  spacing: {
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing(15),
    zIndex: 1,
    display: "flex",
    justifyContent: "space-between",
  },
  buttonContainer: {
    display:"flex",
    alignItems: "center",
    marginLeft: theme.spacing(10),
    flexDirection: "column",
    "& button": {
      margin: theme.spacing(1),
      padding: theme.spacing(2),
      fontWeight: "bold",
      alignItems: "center",
      display: "block",
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
  },
  listContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  accent:{
    color: theme.palette.secondary.main
  }
}));

export default function ProjectsPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectName, setSelectedProjectName] = useState(null);
  const [openProjectManagementModal, setOpenProjectManagementModal] =
    useState(false);
  const [openTeamManagementModal, setOpenTeamManagementModal] = useState(false);
  const [openPTasksManagementModal, setOpenPTasksManagementModal] =
    useState(false);
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
    fetch(
      `http://localhost:80/my-taskmanager/papi/delete-project/${selectedProjectId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
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

  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <div className={classes.backgroundImage}>
      <div className={classes.root}>
        <div className={classes.spacing}>
          <div style={{ width: "60%" }}>
            <Typography variant="h3">PROJECT <span className={classes.accent}>DASHBOARD</span></Typography>
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
          <div style={{ width: "40%", zIndex: "20" }}>
            
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
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => navigate("/analytics")}
                >
                  Analytics Page
                </Button>
              </div>
            )}
            <TeamMembers
            selectedProjectId={selectedProjectId}
            onUpdateTeamMembers={updateTeamMembers}
          />
          </div>
        </div>

        <div className={classes.listContainer}>
          <PTaskList
            selectedProjectId={selectedProjectId}
            selectedProjectName={selectedProjectName}
            teamMembers={teamMembers}
          />
          
        </div>
      </div>
    </div>
  );
}
