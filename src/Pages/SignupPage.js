import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Container.css';

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')

  const usernameHandler = (event) => {
    setUsername(event.target.value)
  }

  const emailHandler = (event) => {
    setEmail(event.target.value)
  }

  const mobileHandler = (event) => {
    setMobile(event.target.value)
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  async function registerRequest() {
    try {
      await fetch('http://localhost:80/my-taskmanager/api/register', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          email: email,
          mobile: mobile,
          password: password
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
            localStorage.setItem('token', data.status)
            navigate('/confirm')
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
    registerRequest()
  }

  return (
    <form className="register-form" onSubmit={submitHandler}>
      <h2>Register</h2>
      <label>Username</label>
      <input type="text" value={username} onChange={usernameHandler} />
      <label>Email</label>
      <input type="text" value={email} onChange={emailHandler} />
      <label>Password</label>
      <input type="password" value={password} onChange={passwordHandler} />
      <label>Mobile</label>
      <input type="text" value={mobile} onChange={mobileHandler} />
      <button>Register</button>
      <Link to="/login"><button>Login </button></Link>
    </form>
  )
}
