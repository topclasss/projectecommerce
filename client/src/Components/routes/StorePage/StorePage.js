//Used to return the page with random products (homepage)

import styled from "styled-components";
import GetRandomProducts from "./GetRandomProducts";

const StorePage = () => {
  return (
    <StyledStorePage>
      <Title>Featured products</Title>
      <main>
        <GetRandomProducts />
      </main>
    </StyledStorePage>
  );
};

const StyledStorePage = styled.div`
background-color: white;

`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 60px;
  margin-top: 60px;
  color: white;
  background-color: #333;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export default StorePage;