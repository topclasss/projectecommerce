//This Component is used to return the page with products by category

import styled from "styled-components";
import { useState } from "react";
import GetProductsByCategory from "./GetProductsByCategory";

const ByCategoryPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [disablePrevious, setDisablePrevious] = useState(true);
  const [disableNext, setDisableleNext] = useState(false);
  const [showFooter, setShowFooter ] = useState ("none");

 

  return (
    <>
      <Title>Shopping page by category</Title>
      <main>
        <GetProductsByCategory
          pageNumber={pageNumber}
          setDisablePrevious={setDisablePrevious}
          setDisableleNext={setDisableleNext}
          setShowFooter={setShowFooter}
        />
      </main>
      <Footer>
        <button style={{ display: showFooter }} disabled={disablePrevious} onClick={() => {setPageNumber(pageNumber - 1);}}>Previous Page</button>
        <button  style={{ display: showFooter }} disabled={disableNext} onClick={() => {setPageNumber(pageNumber + 1);}}>Next Page</button>
      </Footer>
    </>
  );
};

export default ByCategoryPage;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 80px;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;

  button {
    margin: 10px;
  }
`;