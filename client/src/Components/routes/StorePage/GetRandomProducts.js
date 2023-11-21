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
      const nomberOfProductsToDisplay = 6;
      const productsToDisplay = mixedProductsArray.slice(
        0,
        nomberOfProductsToDisplay
      );
      setProductsToDisplay(productsToDisplay);
    }
  }, [products]);

  //Page setup
  return (
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
        <p>Loading</p>
      )}
    </MainGrid>
  );
};

export default GetRandomProducts;

const MainGrid = styled.main`
  display: grid;
  justify-items: center;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 600px;
  margin: 100px 200px 200px 600px;
`;

const ProductBox = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 2px;
  margin: 20px;
  color: black;
  text-decoration: none;

  &.active {
    color: black;
    text-decoration: none;
  }
`;