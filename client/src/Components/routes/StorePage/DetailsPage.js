//Used to get product detail

import { ContextProducts } from "../../Reused/ContextProducts";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { handleAddToCart } from "../../handlesCart/handleAddToCart";

const DetailsPage = ({}) => {
 //Get variables from Context and Params 
  const { products } = useContext(ContextProducts);
  const { productId } = useParams();

 //State variable for product info to display 
  const [productInfo, setproductInfo] = useState(null);

//Send productId to backend
  const handleAdd = async () => {
    await handleAddToCart(productId);
};


//Find the selected product from all products
  useEffect(() => {
    if (products !== null) {
      const productSelected = products.find((product) => {
        if (product._id === Number(productId)) return product;
      });
      setproductInfo(productSelected);
    }
  }, [products]);

  //Page setup
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
            <button onClick={handleAdd}>Add to cart</button>
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
