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

const LoginPage = () => {
  // State variables to hold the username and password entered by the user
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();

  // Function to handle the login form
  const handleLoginSubmit = async () => {
    const customerInfo = await handleSubmit(true, email, password, '', []);
    login(customerInfo);  // Call the `login` function from the UserContext to set customer information

  };

  // Structure for our page
  return (
    <Container>
      <Title>Login</Title>
      <Form>
        <Label>
          Email:
          {/*field for the username */}
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Label>
        <br />
        <Label>
          Password:
          {/*field for the password */}
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Label>
        <br />
        <Button type="button" onClick={handleLoginSubmit}>
          Login
        </Button>
      </Form>
      <Paragraph>
        <StyledSpan>
          Don't have an account? Register{' '}
          <Link to="/register"> here</Link>.
        </StyledSpan>
      </Paragraph>
    </Container>
  );
};

export default LoginPage;