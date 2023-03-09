import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Container.css';

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect , useState } from "react";



const LoginPage = () => {
  const Navigate = useNavigate();

  const [inputs, setInputs] = useState([])

  const {id} = useParams();

  useEffect(() => {
    getUser();
  }, []);

 
  function getUser() {
    axios.get(`http://localhost:80/api/users/${id}`).then(function (response) {
    console.log(response.data);
    setInputs(response.data);

    });
  }
 
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:80/api/users/${id}/login`, inputs).then(function(response){
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
            <h3 className="mb-3">Log in</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email: </Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" onChange={handleChange}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" onChange={handleChange}/>
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

export default LoginPage;
