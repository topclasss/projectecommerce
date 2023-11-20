//Used to get product detail

import { ProductContext } from "../../Reused/ProductContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { handleAddToCart } from "../../handlesCart/handleAddToCart";
import {UserContext} from "../../Reused/UserContext"

const DetailsPage = ({}) => {
 //Get variables from Context and Params 
  const { products } = useContext(ProductContext);
  const { productId } = useParams();
  const {customer} = useContext(UserContext)

 //State variable for product info to display and button disable
  const [productInfo, setproductInfo] = useState(null);
  const [addButtonDisable, setAddButtonDisable] = useState(false)
  const [loggedOrNot, setLoggedOrNot] = useState(true)

//Find the selected product from all products
  useEffect(() => {
    if (products !== null) {
      const productSelected = products.find((product) => {
        if (product._id === Number(productId)) return product;
      });
      setproductInfo(productSelected);
    }
  }, [products]);

//Change button name if user is logged
useEffect(() => {
  if (customer !== null) {
    setLoggedOrNot(false);
  }
}, [customer]);

//Change button disable during add item and re-change it if it works


//Send productId to backend
const handleAdd = async () => {
  setAddButtonDisable(true)
  await handleAddToCart(productId, setAddButtonDisable);
};



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
            <button onClick={handleAdd} disabled={addButtonDisable}>{loggedOrNot ? "Please log in or sign in before adding to cart" : "Add to cart"}</button>
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
