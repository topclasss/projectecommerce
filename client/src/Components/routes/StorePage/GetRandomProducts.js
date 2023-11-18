//This Component is used to get 6 ramdom products

import { ProductsContext } from "../../Reused/ProductsContext";
import { useContext, useEffect, useState } from "react";
import Product from "./Product";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const GetRandomProducts = () => {
  const { products } = useContext(ProductsContext);
  const [productsToDisplay, setProductsToDisplay] = useState(null);

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
        <p>Searching</p>
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
`;

const ProductBox = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 2px;
  margin: 20px;
`;
