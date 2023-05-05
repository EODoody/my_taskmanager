import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import Modal from "../Pages/Modal";

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
      // do something with the response, if needed
    } else {
      // handle error
    }
  };


  return (
    <Modal modalLabel='Assign User To Task' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit}>
        <label>
          Select a team member:
          <select value={selectedMember} onChange={handleSelectMember}>
            <option value="">-- Select a member --</option>
            {teamMembers.map((member) => (
              <option key={member.ID} value={member.ID}>
                {member.username}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Assign</button>
      </form>
    </Modal>
  );
}
