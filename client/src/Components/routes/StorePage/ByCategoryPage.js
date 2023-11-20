//This Component is used to return the page with products by category

import styled from "styled-components";
import { useState } from "react";
import GetProductsByCategory from "./GetProductsByCategory";

const ByCategoryPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [disablePrevious, setDisablePrevious] = useState(true);
  const [disableNext, setDisableleNext] = useState(false);
  const [showFooter, setShowFooter ] = useState ("none");
  const [categoryTitle, setCategoryTitle] = useState ("Shopping page by category")

  return (
    <>
      <Title>{categoryTitle}</Title>
      <main>
        <GetProductsByCategory
          pageNumber={pageNumber}
          setDisablePrevious={setDisablePrevious}
          setDisableleNext={setDisableleNext}
          setShowFooter={setShowFooter}
          setCategoryTitle={setCategoryTitle}
        />
      </main>
      <Footer>
        <button style={{ display: showFooter }} disabled={disablePrevious} onClick={() => {setPageNumber(pageNumber - 1);}}>Previous Page</button>
        <p style={{ display: showFooter }}>{pageNumber}</p>
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
  display: flex;
  justify-content: space-evenly;

  button {
    margin: 10px;
  }
`;
