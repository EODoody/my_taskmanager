import React, { useState, useEffect, useCallback } from "react";
import HandleAsignTask from "./HandleAsignTask";
import "./PTaskList.css";
import jwt from "jwt-decode";
import { makeStyles } from "@mui/styles";
import {
  Typography,
  TableCell,
  Button,
  TableRow,
  TableBody,
  Table,
  TableHead,
} from "@mui/material";

  const useStyles = makeStyles((theme) => ({
    root: {
      color: theme.palette.primary.main,
      fontWeight: "bold",
      "& .MuiTableCell-head": {
        fontWeight: "inherit",
      },
      "& .MuiTableRow-root:hover": {
        cursor: "pointer",
      },
    },
    scrollable: {
      maxHeight: "400px", // Adjust the desired maxHeight value
      overflow: "auto", // Enable scrolling
    },
    todo: {
      backgroundColor: theme.palette.warning.main,
      display: "flex",
      marginTop: theme.spacing(2),
      width: "100%",
      justifyContent: "space-between",
      padding: theme.spacing(2),
    },
    inProgress: {
      backgroundColor: theme.palette.info.main,
      display: "flex",
      marginTop: theme.spacing(2),
      width: "100%",
      justifyContent: "space-between",
      padding: theme.spacing(2),
    },
    completed: {
      backgroundColor: theme.palette.success.main,
      display: "flex",
      marginTop: theme.spacing(2),
      width: "100%",
      justifyContent: "space-between",
      padding: theme.spacing(2),
    },
    tableWrapper: {
      width: "100%",
      display:"block",
    },
  }));


export default function ProjectDetails({
  selectedProjectId,
  selectedProjectName,
}) {
  const [projectTasks, setProjectDetails] = useState([]);
  const [openHandleAsignTask, setOpenHandleAsignTask] = useState(false);

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

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:80/my-taskmanager/papi/delete-task/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        // Remove the deleted task from the UI by filtering out the task with the matching ID
        setProjectDetails((prevTasks) =>
          prevTasks.filter((task) => task.id !== taskId)
        );
      } else {
        throw new Error("error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCompleteTask = async (task) => {
    try {
      const response = await fetch(
        `http://localhost:80/my-taskmanager/papi/complete-task/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        // Update the task status in the UI
        setProjectDetails((prevTasks) =>
          prevTasks.map((prevTask) =>
            prevTask.id === task.id
              ? { ...prevTask, is_completed: "1" }
              : prevTask
          )
        );
      } else {
        throw new Error("error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAssignTaskClose = () => {
    setOpenHandleAsignTask(false);
    fetchProjectDetails();
  };

  // Filter tasks by completion status and user ID
  const todoTasks = projectTasks.filter(
    (task) => !task.is_completed && !task.user_id
  );
  const inProgressTasks = projectTasks.filter(
    (task) => !task.is_completed && task.user_id
  );
  const completedTasks = projectTasks.filter((task) => task.is_completed);

  const classes = useStyles();
  return (
    <div className={`${classes.root} ${classes.scrollable}`}>
      <Typography variant="h3"> PROJECT NAME: {selectedProjectName}</Typography>
      {projectTasks.length > 0 ? (
        <>
          <div className="tables-container">

            <div className={`${classes.tableWrapper} ${classes.todo}`}>
              <Typography variant="h3">To Do Project Tasks</Typography>
              {todoTasks.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Due Date</TableCell>
                      {jwt(localStorage.getItem("token")).user.IsAdmin ===
                        1 && <TableCell>Action</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {todoTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>{task.name}</TableCell>
                        <TableCell>{task.description}</TableCell>
                        <TableCell>{task.due_date}</TableCell>
                        {jwt(localStorage.getItem("token")).user.IsAdmin ===
                          1 && (
                          <TableCell>
                            <Button onClick={() => handleDeleteTask(task.id)}>
                              Delete
                            </Button>
                            <Button
                              onClick={() => setOpenHandleAsignTask(true)}
                            >
                              Assign User
                            </Button>
                            {openHandleAsignTask && (
                              <HandleAsignTask
                                taskid={task.id}
                                selectedProjectId={selectedProjectId}
                                onClose={() => handleAssignTaskClose()}
                                open={openHandleAsignTask}
                              />
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography variant="body1">No To Do Project Tasks</Typography>
              )}
            </div>
            <div className={`${classes.tableWrapper} ${classes.inProgress}`}>
              <Typography variant="h3">In Progress Tasks</Typography>
              {inProgressTasks.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Assigned to</TableCell>
                      {jwt(localStorage.getItem("token")).user.IsAdmin ===
                        1 && <TableCell>Action</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {inProgressTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>{task.name}</TableCell>
                        <TableCell>{task.description}</TableCell>
                        <TableCell>{task.due_date}</TableCell>
                        <TableCell>{task.user_id}</TableCell>
                        {jwt(localStorage.getItem("token")).user.IsAdmin ===
                          1 && (
                          <TableCell>
                            <Button onClick={() => handleCompleteTask(task)}>
                              Complete
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography variant="body1">No In Progress Tasks</Typography>
              )}
            </div>
            
            <div className={`${classes.tableWrapper} ${classes.completed}`}>
            <Typography variant="h3">Completed Tasks</Typography>
              {completedTasks.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Due Date</TableCell>
                      {jwt(localStorage.getItem("token")).user.IsAdmin ===
                        1 && <TableCell>Action</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {completedTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>{task.name}</TableCell>
                        <TableCell>{task.description}</TableCell>
                        <TableCell>{task.due_date}</TableCell>
                        {jwt(localStorage.getItem("token")).user.IsAdmin ===
                          1 && (
                          <TableCell>
                            <Button onClick={() => handleDeleteTask(task.id)}>
                              Delete
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography variant="body1">No Completed Tasks</Typography>
              )}
            </div>
          </div>
        </>
      ) : (
        <Typography variant="body1">No tasks in project</Typography>
      )}
    </div>
  );
}

