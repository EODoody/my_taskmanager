import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Container.css';

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SignupPage = () => {

  const Navigate = useNavigate();

  const [inputs, setInputs] = useState({})
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:80/api/users/save', inputs).then(function(response){
      console.log(response.data);
      Navigate('/'); //this navigates to the main page
    });
    
    //console.log(inputs);
    
  }
  const handleChange = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]:value}));
  }



  return (
    <Container className="form-container justify-content-start">
        <Row className="w-110">
          <Col md={{ span: 5, offset: 1 }} className="my-5">
            <h3 className="mb-3">Sign up</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter your name" onChange={handleChange}/>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange}/>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Mobile number</Form.Label>
                <Form.Control type="text" name="mobile" placeholder="Enter phone number" onChange={handleChange}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange}/>
              </Form.Group>
              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" />
              </Form.Group>
              <Button className='proceed-button' variant="primary" type="submit">
                SignUp
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
  );
};

export default SignupPage;