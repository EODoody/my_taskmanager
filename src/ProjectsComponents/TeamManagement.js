import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Pages/Modal';

function TeamManagement ({ onClose, open, selectedProjectId }) {

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:80/my-taskmanager/papi/get-users',
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
        if (!response.ok) {
          throw new Error('Unable to fetch users');
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
      const response = await fetch(`http://localhost:80/my-taskmanager/papi/add-user-to-project/${selectedProjectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
          project_id: selectedProjectId,
          user_id: selectedUserId
        })
      });
      if (!response.ok) {
        throw new Error('Unable to add user to project');
      }
    
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addUserToProject();
  };

  const handleSelectChange = (event) => {
    setSelectedUserId(event.target.value);
  };

  return (
  <Modal modalLable='Add User to Project' onClose={onClose} open={open}>
    <h3>Selected Project ID: {selectedProjectId}</h3>
    <form onSubmit={handleSubmit}>
      <label>
        Select User :
        <select value={selectedUserId} onChange={handleSelectChange}>
          <option value=''>-- Select User --</option>
          {users.map(({ ID, username }) => (
            <option key={ID} value={ID}>
              {username} ({ID})
            </option>
          ))}
        </select>
      </label>
      
      <button type='submit' disabled={!selectedUserId}>Add User</button>
    </form>
  </Modal>
);
}

TeamManagement.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedProjectId: PropTypes.number.isRequired
};

export default TeamManagement;
