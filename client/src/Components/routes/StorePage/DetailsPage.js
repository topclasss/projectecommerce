//Used to get product detail

import { ProductContext } from "../../Reused/ProductContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { handleAddToCart } from "../../handlesCart/handleAddToCart";
import {handleRemoveFromCart} from "../../handlesCart/handleRemoveFromCart"
import {CustomerContext} from "../../Reused/CustomerContext "
import { useNavigate } from "react-router-dom";
import { GetCompanyId } from "./GetCompanyId";

const DetailsPage = ({}) => {
 //Get variables from Context and Params 
  const { products } = useContext(ProductContext);
  const { productId } = useParams();
  const params = useParams();
  const {customer, addToCart, removeToCart} = useContext(CustomerContext)
  const navigate = useNavigate()

 //State variable for product info to display and button disable/display // And error messages
  const [productInfo, setproductInfo] = useState(null);
  const [addButtonDisable, setAddButtonDisable] = useState(false)
  const [displayAdd, setDisplayAdd] = useState ("")
  const [displayQuantity, setDisplayQuantity] = useState ("none")
  const [plusMinusButtonDisable, setPlusMinusButtonDisable] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [company, setCompany] = useState(null)
const [companyNumber, setCompanyNumber] = useState(null)


  let productInCart = false
   if (customer) {
   productInCart = customer.cart.find((product) => {
if (product._id === productId)
return true
    })
    }

let quantity = productInCart ? productInCart.quantity : "" 




//Find the selected product from all products
  useEffect(() => {
    if (products !== null) {
      const productSelected = products.find((product) => {
        if (product._id === Number(productId)) return product;
      });
      setproductInfo(productSelected);
      setCompanyNumber(productSelected.companyId)
     
     if (productSelected.numInStock === 0)
            {setAddButtonDisable(true)}

            if (companyNumber !== null)
          {handlecompany()}
    }
  }, [products, companyNumber]);

  //Set display button if item is in the cart or not
  useEffect (( ) => {
      if (quantity === "" )
    {setDisplayAdd(""), setDisplayQuantity("none")}
    else {setDisplayAdd("none"), setDisplayQuantity("")}
  }, [productInCart]);
  

  const handlecompany= async () => {
    await GetCompanyId(companyNumber, setErrorMessage, setCompany);   
   };


//Add product to MongoDB and cart and set buttons display
const handleAdd = async () => {
  setAddButtonDisable(true)
  setPlusMinusButtonDisable (true)
  setErrorMessage("")
  await handleAddToCart(productId, addToCart, customer._id, setErrorMessage);   
  setAddButtonDisable(false)
  setDisplayAdd("none")
  setDisplayQuantity(" ")
  setPlusMinusButtonDisable (false)
 };

//Remove product to MongoDB and cart and set buttons display
const handleRemove = async () => {
  setPlusMinusButtonDisable (true)
  setDisplayAdd("none")
  setErrorMessage("")
   await handleRemoveFromCart(productId, removeToCart, customer._id, setErrorMessage);   
   setDisplayQuantity(" ")
  setPlusMinusButtonDisable (false)
};

//If user not log navigate to login page
const handleUserNotLog = () => {
  {navigate("/login")}
}


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
            <p>Company: {company}</p>
            <ButtonBox>    

             {!customer  ? (
                <button onClick={handleUserNotLog} disabled={addButtonDisable}>Add to cart</button>
              ): (
            <button onClick={handleAdd} disabled={addButtonDisable}  style={{display: displayAdd}}>Add to cart</button>
          )}

            <button onClick={handleRemove} disabled={plusMinusButtonDisable}  style={{ display: displayQuantity }}>{ "-" }</button>
            <p style={{ display: displayQuantity }} > {quantity}  </p>
            <button onClick={handleAdd} disabled={plusMinusButtonDisable} style={{ display: displayQuantity }}>{ "+" }</button>
            </ButtonBox>
            { (!errorMessage) ? (
           <p></p>
        ):( <p>{errorMessage} </p>
        )}
          </ProductBox>
        ) : (
          <Loading>Loading...</Loading>
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
  max-width: 800px;
 margin-left: 430px;
 background-color: white;
  
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 80px;
  background-color: #333;
  padding-top: 20px;
  padding-bottom: 20px;
  color: white;
`;

const ButtonBox = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;

button {
  background-color: black; 
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;

  &:disabled{
    opacity: 0.2
  }
} 
  & p {
    font-size: 20px;
  }
`;

const Loading = styled.h1`
 text-align: center;
  margin-bottom: 80px;
`;