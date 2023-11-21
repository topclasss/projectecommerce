//Used to get 6 ramdom products

import { ProductContext } from "../../Reused/ProductContext";
import { useContext, useEffect, useState } from "react";
import Product from "./Product";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const GetRandomProducts = () => {
  //Get variables from Context and Params 
  const { products } = useContext(ProductContext);

   //State variable for the 6 products to display 
  const [productsToDisplay, setProductsToDisplay] = useState(null);


  //Select 6 random product to display
  useEffect(() => {
    if (products) {
      const mixedProductsArray = [...products].sort(() => {
        return Math.random() - 0.5;
      });
      const nomberOfProductsToDisplay = 10;
      const productsToDisplay = mixedProductsArray.slice(
        0,
        nomberOfProductsToDisplay
      );
      setProductsToDisplay(productsToDisplay);
    }
  }, [products]);

  //Page setup
  return (
    <>
     {productsToDisplay ? (
    <MainGrid>
      {productsToDisplay ? (
        productsToDisplay.map((product) => {
          return (
            <ProductBox key={product._id} to={`/product/${product._id}`}>
              <Product
              category={product.category}
                price={product.price}
                imageSrc={product.imageSrc}
                numInStock={product.numInStock}
              />
            </ProductBox>
          );
        })
      ) : (
        <></>
      )}
    </MainGrid>
      ) : (
        <Loading>Loading...</Loading>
      )}
    </>
  );
};

export default GetRandomProducts;

const MainGrid = styled.main`
  display: grid;
  justify-items: center;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  max-width: 600px;
  margin: 0 200px 200px 460px;
  
`;

const ProductBox = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  color: black;
  text-decoration: none;
  min-width: 180px;
  background-color: white;
  
  ;

  &.active {
    color: black;
    text-decoration: none;
  }
`;

const Loading = styled.h1`
 text-align: center;
  margin-bottom: 80px;
`;