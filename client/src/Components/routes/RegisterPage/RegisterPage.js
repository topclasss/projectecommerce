import React, { useState } from 'react';
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
import { useUser } from '../../Reused/UserContext';

const RegisterPage = () => {
    // State variables to keep track of the form fields
    const { login } = useUser();  
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    // Function to handle the form submission when the user wants to register
    const handleRegisterSubmit = async () => {
      // Check if password and confirm password match
      if (password !== confirmPassword) {
        console.error('Passwords do not match');
        return;
      }
  
      const cartData = [];

      // Call your authentication service with the required parameters
      try {
        const customerInfo = await handleSubmit(false, email, password, firstName, lastName, cartData);
        login(customerInfo); // Call login function to set customer information
        // Handle successful registration, redirect, etc...
        console.log('Registration successful');
      } catch (error) {
        console.error('Error during registration:', error);
      }
    };
  
    // Structure of our page
    return (
      <Container>
        <Title>Register</Title>
        <Form>
          <Label>
            Email:
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Label>
          <br />
          <Label>
            First Name:
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Label>
          <br />
          <Label>
            Last Name:
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Label>
          <br />
          <Label>
            Password:
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Label>
          <br />
          <Label>
            Confirm Password:
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Label>
          <br />
          <Button type="button" onClick={handleRegisterSubmit}>
            Register
          </Button>
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