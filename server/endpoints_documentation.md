**OPTIONAL: You can document your endpoints in this file.**



/get-products
return:
data: [ <all products ojects> ]


/create-customer
expect:
body: {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
}
return:
data: {
  _id: ""
  email: "",
  firstName: "",
  lastName: "",
  cart: [],
  previousOrders: []
}


/get-customer-infos
expect:
body: {
  email: "",
  password: ""
}
return:
data: {
  _id: "",
  email: "",
  firstName: "",
  lastName: "",
  cart: [],
  previousOrders: []
}


/add-to-cart
expect:
body: {
  customerId: "",
  productId: ""
}
return:
message: {
  "new product successfully added to cart"
  or
  "quantity of existing product successfully incremented"
}