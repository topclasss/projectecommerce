"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const { v4: uuidv4 } = require("uuid");

const addCustomer = async (request, response) => {
  const { email, password, firstName, lastName, cart } = request.body;

  //create new customer document. ignore unwanted keys and create id
  const newCustomer = {
    _id: uuidv4(),
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    cart: cart ? cart : [],
    previousOrders: [],
  };

  //validation for missing information
  let invalideKey = null;
  Object.keys(newCustomer).forEach((key) => {
    if (!newCustomer[key]) {
      invalideKey = true;
    }
  });
  if (invalideKey) {
    return response.status(400).json({
      status: 400,
      data: newCustomer,
      message: "missing information",
    });
  }

  //more validation is needed here but not enough time sorry.

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("project_ecom");
    await db.collection("customers").insertOne(newCustomer);
    //remove password before sending data back
    delete newCustomer.password;
    response
      .status(201)
      .json({ status: 201, data: newCustomer, message: "customer added" });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ status: 500, data: {}, message: "unknow error as occured" });
  } finally {
    client.close();
  }
};

module.exports = addCustomer;
