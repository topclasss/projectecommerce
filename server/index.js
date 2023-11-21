"use strict";

const express = require("express");
const morgan = require("morgan");

const getProducts = require("./handlers/getProducts");
const getProduct = require("./handlers/getProduct");
const addCustomer = require("./handlers/addCustomer");
const getCustomerInfos = require("./handlers/getCustomerInfos");
const addToCart = require("./handlers/addToCart");
const removeFromCart = require("./handlers/removeFromCart");
const getCompany = require("./handlers/getCompany")
const createOrder = require("./handlers/createOrder")
const getOrderDetails = require("./handlers/getOrderDetails")

express()
  .use(express.json())
  .use(morgan("tiny"))
  //Not exactly sure what this one does. I copied it from a previous project.
  //Original comment said: Any requests for static files will go into the public folder
  .use(express.static("public"))

  //------------ENDPOINTS STARTS HERE---------------

  .get("/get-products", getProducts)
  .get("/get-product/:id", getProduct)
  .get("/get-company/:id", getCompany)
  .post("/add-customer", addCustomer)
  .post("/get-customer-infos", getCustomerInfos)
  .patch("/add-to-cart", addToCart)
  .patch("/remove-from-cart", removeFromCart)
  .post("/create-order", createOrder)
  .get("/order-details/:id", getOrderDetails)


  // Catches all error response
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(8000, () => {
    console.log(`Server listening on port ${8000}`);
  });
