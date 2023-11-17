import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Title = styled.h2`
  color: black;
  text-align: center;
  
  
`;

export const Form = styled.form`
 background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #333;
  
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  
  
`;

export const Button = styled.button`
  background-color: black; 
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  
`;

export const Paragraph = styled.p`
  margin-top: 15px;
  color: #333;
`;

export const StyledSpan = styled.span`
  color: #333;
  cursor: pointer;
  text-decoration: underline;
  position: absolute;
  bottom: 20px; 
  left: 50%;
  transform: translateX(-50%);
`;

export default {
  Container,
  Title,
  Form,
  Label,
  Input,
  Button,
  Paragraph,
  StyledSpan,
};