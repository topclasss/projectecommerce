import React, { useContext, useState, useEffect } from 'react';
import {
  Container,
  Title,
  Form,
  Label,
  Input,
  Button,
  Paragraph,
  StyledSpan,
} from '../../Reused/styledComponents'; 
import { Link } from 'react-router-dom'; 
import { handleSubmit } from '../../handleSubmit/authenticationService'; 
//import { useUser } from '../../Reused/CustomerContext ';
import { CustomerContext } from '../../Reused/CustomerContext ';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    // State variables to keep track of the form fields // And error message
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {login} = useContext(CustomerContext)
    const navigate = useNavigate()
const [errorMessage, setErrorMessage] = useState(null)



    // Function to handle the form submission when the user wants to register
    const handleRegisterSubmit = async () => {
      // Check if password and confirm password match
      if (password !== confirmPassword) {
          setErrorMessage("Passwords do not match")
           return;
      }
       const cartData = [];
      

      // Call your authentication service with the required parameters
      try {
        const customerInfo = await handleSubmit(false, email, password, firstName, lastName, cartData, login, navigate, setErrorMessage);
        //login(customerInfo); // Call login function to set customer information
        // Handle successful registration, redirect, etc...
      } catch (error) {
        setErrorMessage('Error during registration:', error);
      }
    };
 
    // Structure of our page
    return (
      <Container>
      <Title style={{ color: 'white' }}>Register</Title>
      <Form>
        <Label style={{ color: 'black' }}>
            Email:
            <Input
              type="email"
              value={email}
              onChange={(e) => {setEmail(e.target.value), setErrorMessage("")}}
            />
          </Label>
          <br />
          <Label>
            First Name:
            <Input
              type="text"
              value={firstName}
              onChange={(e) => {setFirstName(e.target.value), setErrorMessage("")}}
            />
          </Label>
          <br />
          <Label>
            Last Name:
            <Input
              type="text"
              value={lastName}
              onChange={(e) => {setLastName(e.target.value), setErrorMessage("")}}
            />
          </Label>
          <br />
          <Label>
            Password:
            <Input
              type="password"
              value={password}
              onChange={(e) => {setPassword(e.target.value), setErrorMessage("")}}
            />
          </Label>
          <br />
          <Label>
            Confirm Password:
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => {setConfirmPassword(e.target.value), setErrorMessage("")}}
            />
          </Label>
          <br />
          <Button type="button" onClick={handleRegisterSubmit}>
            Register
          </Button>

          { (!errorMessage) ? (
           <p></p>
        ):( <p>{errorMessage} </p>
        )}

        </Form>

        <Paragraph>
          <StyledSpan>
            Already have an account? Login <Link to="/login">here</Link>.
          </StyledSpan>
        </Paragraph>
      </Container>
    );
  };
  
  export default RegisterPage;