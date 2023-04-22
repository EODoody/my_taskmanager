
import { Link } from 'react-router-dom'
import jwt from 'jwt-decode'

export default function Profile() {
  
  const userToken = jwt(localStorage.getItem('token'))
  return (
    <div className="profile">
      <h2>Profile</h2>
      <h2>User from token</h2>
      {userToken && (
        <>
          <p>
            <strong>Username:</strong> {userToken.user.username}<br />
            <strong>Email:</strong> {userToken.user.email}<br />
            <strong>Mobile number:</strong> {userToken.user.mobile}<br />
            <strong>Account born on:</strong> {userToken.user.created_date}<br />
            <strong>iSAdmin:</strong> {userToken.user.IsAdmin}<br />
            <strong>isProjectPart</strong> {userToken.user.IsPartOfProject}
          </p>
        </>
      )}
      <Link to="/">Home</Link>
    </div>
  );
}
