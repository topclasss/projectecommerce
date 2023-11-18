//This Componene is used to get product detail

import { ProductsContext } from "../../Reused/ProductsContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const DetailsPage = ({}) => {
  const { products } = useContext(ProductsContext);
  const { productId } = useParams();
  const [productInfo, setproductInfo] = useState(null);

  useEffect(() => {
    if (products !== null) {
      const productSelected = products.find((product) => {
        if (product._id === Number(productId)) return product;
      });
      setproductInfo(productSelected);
    }
  }, [products]);

  return (
    <>
      <Title>Product page</Title>
      <main>
        {productInfo ? (
          <ProductBox>
            <p>Name: {productInfo.name}</p>
            <p>Price: {productInfo.price}</p>
            <p>body location: {productInfo.body_location}</p>
            <p>Category: {productInfo.category}</p>
            <p>Product id: {productInfo._id}</p>
            <img src={productInfo.imageSrc} />
            <p>Stock: {productInfo.numInStock}</p>
            <p>Company: {productInfo.companyId}</p>
            <button>Add to cart</button>
          </ProductBox>
        ) : (
          <p>Searching</p>
        )}
      </main>
    </>
  );
};

export default DetailsPage;

const ProductBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 2px;
  margin: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 80px;
`;
