import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  const navigate = useNavigate()
  
  const [username, setUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const usernameHandler = (event) => {
    setUsername(event.target.value)
  }

  const newPasswordHandler = (event) => {
    setNewPassword(event.target.value)
  }

  const confirmNewPasswordHandler = (event) => {
    setConfirmNewPassword(event.target.value)
  }

  async function resetRequest() {
    try {
      await fetch('http://localhost:80/my-taskmanager/api/reset', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword
        }),
      })
        .then((respose) => {
          if (respose.ok) {
            return respose.json()
          }
          throw new Error('error')
        })
        .then((data) => {
          if (data.status) {
            // password reset successful
            navigate('/')
          } else {
            //set error
          }
        })
    } catch (error) {
      console.log(error.message)
    }
  }

  const submitHandler = (event) => {
    event.preventDefault()
  
    if (newPassword !== confirmNewPassword) {
      alert('New password and confirm new password do not match')
      return
    }
  
    resetRequest()
  }

  return (
    <form className="register-form" onSubmit={submitHandler}>
      <h2>Reset Password</h2>
      <label>Username or Email</label>
      <input type="text" value={username} onChange={usernameHandler} />
      <label>New Password</label>
      <input type="password" value={newPassword} onChange={newPasswordHandler} />
      <label>Confirm New Password</label>
      <input type="password" value={confirmNewPassword} onChange={confirmNewPasswordHandler} />
      <br></br>
      <button style={{marginRight: "20px"}}>Reset Password</button>
      
      <Link to="/login">Login</Link>
    </form>
  )
}