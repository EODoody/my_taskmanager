import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import Modal from "../Pages/Modal";
import { FormControl, InputLabel, Select ,MenuItem ,Box, Button, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 9999, // Set a higher zIndex value for the modal container
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    color: theme.palette.text.primary,
    zIndex: 20,
  },
  button: {
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: theme.spacing(1),
    },
  },
}));


export default function HandleAsignTask({ selectedProjectId, taskid, onClose, open }) {
    
  const [selectedMember, setSelectedMember] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  const handleSelectMember = (event) => {
    setSelectedMember(event.target.value);
  };

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
          
        } else {
          throw new Error("error");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [selectedProjectId])

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers, selectedProjectId]);


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const response = await fetch(`http://localhost:80/my-taskmanager/papi/assign-user-to-task/${taskid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        assigned_user_id: selectedMember,
      }),
    });
  
    if (response.ok) {
      // do something with the response, or not
    } else {
      // handle error
    }
  };

  const classes=useStyles();
  return (
    <div className={classes.modalContainer}>
      <Modal modalLable="Assign User To Task" onClose={onClose} open={open}>
        <Typography className={classes.formControl}> Select a user from the dropdown below </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="member-select-label">Select a team member:</InputLabel>
            <Select
              labelId="member-select-label"
              id="member-select"
              value={selectedMember}
              onChange={handleSelectMember}
              
            >
              <MenuItem value="">
                <em>-- Select a member --</em>
              </MenuItem>
              {teamMembers.map((member) => (
                <MenuItem key={member.ID} value={member.ID}>
                  {member.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" type="submit" disabled={!selectedMember} className={classes.button}>
              Assign
            </Button>
          </Box>
        </form>
      </Modal>
      </div>
    );
  }

