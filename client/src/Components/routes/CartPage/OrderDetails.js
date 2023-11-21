import styled from "styled-components";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CustomerContext } from "../../Reused/CustomerContext ";


const OrderDetails =  () =>{
  const {customer} = useContext(CustomerContext)
  const { id }= useParams()
  if (!customer){
    return <p>Loading...</p>
  }
  const foundOrder = customer.previousOrders.find((order)=>{
    if (order._id === id){
      return true
    }
  })
if(!foundOrder){
  return <p>order not found!...</p>
}
  const {_id, orderDate, buyerName, address, postalCode, provinceState, country, shoppingBag } = foundOrder
  return<OrderDetailsWrapper>
    <h3>Order details:</h3>
    <p>order id: {_id}</p>
    <p>order date: {orderDate}</p>
    <p>name: {buyerName}</p>
    <p>address: {address}" "{postalCode}" "{provinceState}" "{country}</p>
    {/* need a map here to show shopping bag array */}
  </OrderDetailsWrapper>

}

export default OrderDetails

const OrderDetailsWrapper = styled.div`

`