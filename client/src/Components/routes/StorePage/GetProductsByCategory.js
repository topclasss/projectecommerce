//This Componene is used to get products by category

import { ProductsContext } from "../../Reused/ProductsContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "./Product";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const GetProductsByCategory = ({pageNumber, setDisablePrevious, setDisableleNext, setShowFooter}) => {
  const { products } = useContext(ProductsContext);
  const { categoryId } = useParams();
  const [productsToDisplay, setProductsToDisplay] = useState(null);

  useEffect(() => {
    if (products !== null) {
      const productsByCategory = products.filter((product) => {
        return product.category === categoryId;
      });

      const productsByPage = productsByCategory.filter((product, index) => {
        if (index >= (pageNumber - 1) * 21 && index < pageNumber * 21) {
          return product;
        }
      });
      setProductsToDisplay(productsByPage);
      setShowFooter("");

      if (pageNumber !== 1) {
        setDisablePrevious(false);
      }

      if (
        (productsByCategory.length / 21 < pageNumber &&
          productsByCategory.length / 21 < pageNumber + 1) ||
        productsByCategory.length === 21
      ) {
        setDisableleNext(true);
      } else {
        setDisableleNext(false);
      }
    }
  }, [products, pageNumber]);

  return (
    <MainGrid>
      {productsToDisplay ? (
        productsToDisplay.map((product) => {
          return (
            <ProductBox key={product._id} to={`/product/${product._id}`}>
              <Product
                price={product.price}
                imageSrc={product.imageSrc}
                category={product.category}
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

export default GetProductsByCategory;

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
