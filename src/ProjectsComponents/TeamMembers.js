import React, { useState, useEffect, useCallback } from "react";

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

  return (
    <div>
      <h2>Team Members:</h2>
      {teamMembers.length > 0 ? (
        <>
          <ul>
           {teamMembers.map((member) => (
            <li key={member.ID}>{member.username}  -- ID: {member.ID}</li>
        ))}
          </ul>
        </>
      ) : (
        <p>You need to select a project to see your colleagues...</p>
      )}
    </div>
  );
}
