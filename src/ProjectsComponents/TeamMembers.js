import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect, useCallback } from "react";


const useStyles = makeStyles((theme) => ({
  teamMembersContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  teamMembersList: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    padding: 0,
    margin: 0,
  },
  teamMembersListItem: {
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
  },
  teamMembersListItemID: {
    marginRight: 10,
  },
}));


export default function TeamMembers({ selectedProjectId, onUpdateTeamMembers  }) {
  const [teamMembers, setTeamMembers] = useState([]);

  const fetchTeamMembers = useCallback(async () => {
    try {
      if (selectedProjectId) {
        // Check if selectedProjectId is defined
        const response = await fetch(
          `http://localhost:80/my-taskmanager/papi/get-project-team-members/${selectedProjectId}`,
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
          console.log(data);
          setTeamMembers(data);
          onUpdateTeamMembers(data);
        } else {
          throw new Error("error");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [selectedProjectId,onUpdateTeamMembers]);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers, selectedProjectId]);

  const classes = useStyles();
  return (
    <div className={classes.teamMembersContainer}>
  <Typography variant="h5">Team Members: </Typography>
  {teamMembers.length > 0 ? (
    <div className={classes.teamMembersList}>
      {teamMembers.map((member) => (
        <div key={member.ID} className={classes.teamMembersListItem}>
          <Typography className={classes.teamMembersListItemID}>
            ID: {member.ID}
          </Typography>
          <Typography> &#8594; {member.username}</Typography>
        </div>
      ))}
    </div>
  ) : (
    <Typography variant="body1">
      You need to select a project to see your colleagues...
    </Typography>
  )}
</div>
  );
}
