import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  tableHeader: {
    backgroundColor: theme.palette.primary.main,
  },
  tableHeaderText: {
    color: theme.palette.common.white,
  },
  tableRow: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  selectedTableRow: {
    backgroundColor: theme.palette.action.selected,
  },
}));


export default function ProjectList({ onProjectSelect }) {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

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
    <Paper className={classes.root}>
      <Typography variant="h4" component="h2">
        Projects List
      </Typography>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeader}>
              <TableCell className={classes.tableHeaderText}>ID</TableCell>
              <TableCell className={classes.tableHeaderText}>Name</TableCell>
              <TableCell className={classes.tableHeaderText}>
                Description
              </TableCell>
              <TableCell className={classes.tableHeaderText}>
                Start Date
              </TableCell>
              <TableCell className={classes.tableHeaderText}>
                End Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.id}
                onClick={() => handleProjectClick(project.id, project.name)}
                className={`${classes.tableRow} ${
                  project.id === selectedProjectId ? classes.selectedTableRow : ""
                }`}
              >
                <TableCell>{project.id}</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.start_date}</TableCell>
                <TableCell>{project.end_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}

