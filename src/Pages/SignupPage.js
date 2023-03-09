import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Container.css';

import { useState } from "react";
//import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function SignupPage() {

  const Navigate = useNavigate();
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
      await fetch('http://localhost:80/my-taskmanager/api/signup', {
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
            Navigate('/confirm')
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
    <Container className="form-container justify-content-start">
        <Row className="w-110">
          <Col md={{ span: 5, offset: 1 }} className="my-5">
            <h3 className="mb-3">Sign up</h3>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} placeholder="Enter your name" onChange={usernameHandler}/>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" value={email} placeholder="Enter email" onChange={emailHandler}/>
              </Form.Group>
              <Form.Group controlId="formBasicMobile">
                <Form.Label>Mobile number</Form.Label>
                <Form.Control type="text" value={mobile} placeholder="Enter phone number" onChange={mobileHandler}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} placeholder="Password" onChange={passwordHandler}/>
              </Form.Group>
              <Button className='proceed-button' variant="primary" type="submit">
                SignUp
              </Button>
            </Form>
          </Col>
          <Link to='/login'>Login</Link>
        </Row>
      </Container>
  );
};

