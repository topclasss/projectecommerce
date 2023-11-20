//Used to get products by category

import { ProductContext } from "../../Reused/ProductContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "./Product";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const GetProductsByCategory = ({pageNumber, setDisablePrevious, setDisableleNext, setShowFooter}) => {
 
  //Get variables from Context and Params
  const { products } = useContext(ProductContext);
  const { categoryId } = useParams();

 //State variable for products display  
  const [productsToDisplay, setProductsToDisplay] = useState(null);


  //Find products included in the selected category, set 21 products by page and set previous and next button accroding to the number of products
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

  //Page setup

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
