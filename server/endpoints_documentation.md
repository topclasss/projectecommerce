**OPTIONAL: You can document your endpoints in this file.**



/get-products
return:
data: [ <all products ojects in an array> ]

***This one shouldn't be needed for now. Use the ContextProducts instead***
/get-product/:id
return:
data: { <one product object> }

/get-company/:id
return exemple:
	"data": {
		"_id": 19962,
		"name": "Barska",
		"url": "http://www.barska.com/",
		"country": "United States"
	}


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
data: {
  _id: "<product id>",
  quantity: <updated quantity>
}
message: {
  "new product successfully added to cart"
  or
  "quantity of existing product successfully incremented"
}

/remove-from-cart
expect:
body: {
  customerId: "",
  productId: ""
}
return:
data: {
  _id: "<product id>",
  quantity: <updated quantity>
  or
  { } ***if product was removed from card***
}
message: {
   "product successfully removed from cart"
  or
  "quantity of existing product successfully decreased"
}