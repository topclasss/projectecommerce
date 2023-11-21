import styled from "styled-components";

const OrderDetails =  ({orderInfos}) =>{
  const {_id, orderDate, buyerName, address, postalCode, provinceState, country, shoppingBag } = orderInfos
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