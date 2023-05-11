import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../Pages/Modal";
import { makeStyles } from "@mui/styles";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
  Box,
} from "@mui/material";

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 200,
    marginBottom: "1rem",
  },
}));

function TeamManagement({ onClose, open, selectedProjectId }) {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:80/my-taskmanager/papi/get-users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (!response.ok) {
          throw new Error("Unable to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUsers();
  }, []);

  const addUserToProject = async () => {
    try {
      const response = await fetch(
        `http://localhost:80/my-taskmanager/papi/add-user-to-project/${selectedProjectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            project_id: selectedProjectId,
            user_id: selectedUserId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Unable to add user to project");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addUserToProject();
    onClose();
  };

  const handleSelectChange = (event) => {
    setSelectedUserId(event.target.value);
  };

  const classes = useStyles();
  return (
    <Modal modalLable="Add User to Project" onClose={onClose} open={open}>
      <Typography variant="h6" component="h2" gutterBottom>
        Selected Project ID: {selectedProjectId}
      </Typography>

      <form onSubmit={handleSubmit}>
      <FormControl className={classes.formControl} style={{ minWidth: 200 }}>
  <InputLabel id="user-select-label">Select User</InputLabel>
  <Select
    labelId="user-select-label"
    id="user-select"
    value={selectedUserId}
    onChange={handleSelectChange}
    label="Select User"
    defaultValue=""
  >
    <MenuItem value="">
      <em>-- Select User --</em>
    </MenuItem>
    {users.map(({ ID, username }) => (
      <MenuItem key={ID} value={ID}>
        {username} ({ID})
      </MenuItem>
    ))}
  </Select>
</FormControl>

<Box display="flex" justifyContent="flex-end" mt={2}>
  <Button variant="contained" type="submit" disabled={!selectedUserId} style={{ marginLeft: 'auto' }}>
    Add User
  </Button>
</Box>
      </form>
    </Modal>
  );
}

TeamManagement.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedProjectId: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
  onUserAdded: PropTypes.func.isRequired,
};

export default TeamManagement;
