//Used to get product detail

import { ProductContext } from "../../Reused/ProductContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { handleAddToCart } from "../../handlesCart/handleAddToCart";
import {handleRemoveFromCart} from "../../handlesCart/handleRemoveFromCart"
import {CustomerContext} from "../../Reused/CustomerContext "
import { useNavigate } from "react-router-dom";

const DetailsPage = ({}) => {
 //Get variables from Context and Params 
  const { products } = useContext(ProductContext);
  const { productId } = useParams();
  const {customer, addToCart, removeToCart} = useContext(CustomerContext)
  const navigate = useNavigate()

 //State variable for product info to display and button disable/display
  const [productInfo, setproductInfo] = useState(null);
  const [addButtonDisable, setAddButtonDisable] = useState(false)
  const [displayAdd, setDisplayAdd] = useState ("")
  const [displayQuantity, setDisplayQuantity] = useState ("none")
  const [plusMinusButtonDisable, setPlusMinusButtonDisable] = useState(false)


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

      if (productSelected.numInStock === 0)
          {setAddButtonDisable(true)}
    }
  }, [products]);

  //Set display button if item is in the cart or not
  useEffect (( ) => {
      if (quantity === "" )
    {setDisplayAdd(""), setDisplayQuantity("none")}
    else {setDisplayAdd("none"), setDisplayQuantity("")}
  }, [productInCart]);
  



//Add product to MongoDB and cart and set buttons display
const handleAdd = async () => {
  setAddButtonDisable(true)
  setPlusMinusButtonDisable (true)
  await handleAddToCart(productId, addToCart, customer._id);   
  setAddButtonDisable(false)
  setDisplayAdd("none")
  setDisplayQuantity(" ")
  setPlusMinusButtonDisable (false)
 };

//Remove product to MongoDB and cart and set buttons display
const handleRemove = async () => {
  setPlusMinusButtonDisable (true)
  setDisplayAdd("none")
   await handleRemoveFromCart(productId, removeToCart, customer._id);   
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
            <p>Company: {productInfo.companyId}</p>
            <ButtonBox>    

             {!customer  ? (
                <button onClick={handleUserNotLog}>Add to cart</button>
              ): (
            <button onClick={handleAdd} disabled={addButtonDisable}  style={{display: displayAdd}}>Add to cart</button>
          )}


            <button onClick={handleRemove} disabled={plusMinusButtonDisable}  style={{ display: displayQuantity }}>{ "-" }</button>
            <p style={{ display: displayQuantity }} > {quantity}  </p>
            <button onClick={handleAdd} disabled={plusMinusButtonDisable} style={{ display: displayQuantity }}>{ "+" }</button>
            </ButtonBox>
          </ProductBox>
        ) : (
          <p>Loading</p>
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

const ButtonBox = styled.div`
display: flex;
justify-content: space-evenly;
`