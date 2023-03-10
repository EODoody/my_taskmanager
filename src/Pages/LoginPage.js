import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Container.css';


//import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



export default function LoginPage() {
  const Navigate = useNavigate();
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const usernameHandler = (event) => {
    setUsername(event.target.value)
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }
 
  const submitHandler = (event) => {
    event.preventDefault()
    loginRequest()
  }

  async function loginRequest() {
    try {
      await fetch('http://localhost:80/my-taskmanager/api/login', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
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
            
          } else {
            //set error
          }
        })
    } catch (error) {
      console.log(error.message)
    }
    //idea is to navigate to a loading page and then render the app navbar again when the user is logged in
    Navigate('/');
  }

  
  return (
    <Container className="form-container justify-content-start">
        <Row className="w-110">
          <Col md={{ span: 5, offset: 1 }} className="my-5">
            <h3 className="mb-3">Log in</h3>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username: </Form.Label>
                <Form.Control type="username" value={username} placeholder="Enter username" onChange={usernameHandler}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" value={password} placeholder="Password" onChange={passwordHandler}/>
              </Form.Group>
              <Button className='proceed-button' variant="primary" type="submit">
                Flip the page
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
  );
};


