//Used to return the page with random products (homepage)

import styled from "styled-components";
import GetRandomProducts from "./GetRandomProducts";

const StorePage = () => {
  return (
    <>
      <Title>Features products</Title>
      <main>
        <GetRandomProducts />
      </main>
    </>
  );
};

export default StorePage;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 80px;
`;
