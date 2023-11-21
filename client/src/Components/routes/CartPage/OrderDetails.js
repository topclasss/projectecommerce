import styled from "styled-components";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CustomerContext } from "../../Reused/CustomerContext ";

const OrderDetails = () => {
  const { customer } = useContext(CustomerContext);
  const { id } = useParams();
  if (!customer) {
    return <p>Loading...</p>;
  }
  const foundOrder = customer.previousOrders.find((order) => {
    if (order._id === id) {
      return true;
    }
  });
  if (!foundOrder) {
    return <p>order not found!...</p>;
  }
  const {
    _id,
    orderDate,
    buyerName,
    address,
    postalCode,
    provinceState,
    country,
    shoppingBag,
  } = foundOrder;
  console.log();
  return (
    <OrderDetailsWrapper>
      <div>
        <h3>Order details:</h3>
        <p>order id: {_id}</p>
        <p>order date: {orderDate}</p>
        <p>name: {buyerName}</p>
        <p>
          address: {address}, {provinceState}, {country}, {postalCode}
        </p>
        {/* need a map here to show shopping bag array */}
        <ol>
          <h4>Items:</h4>
          {shoppingBag.map((product)=> {
            return <li>
              <p>-----------------------</p>
              <p>name: {product.name}</p>
              <p>price: {product.price}</p>
              <img src={product.imageSrc}></img>
            </li>
          })}
        </ol>
      </div>
    </OrderDetailsWrapper>
  );
};

export default OrderDetails;

const OrderDetailsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top:20vh;
  & img{
    width:100px;
  }
`;
