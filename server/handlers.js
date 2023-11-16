"use strict";

const { response } = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const { v4: uuidv4 } = require("uuid");


//------------HANDLERS START HERE---------------

const getProducts = async (request, response) => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("project_ecom");
    const products = await db.collection("items").find().toArray();
    response.status(200).json({ status: 200, data: products, message: "" });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ status: 500, data: {}, message: "unknow error as occured" });
  } finally {
    client.close();
  }
};



const addCustomer = async (request, response) => {
  const { email, password, name, cart } = request.body;

  //create new customer document. ignore unwanted keys and create id
  const newCustomer = {
    _id: uuidv4(),
    email: email,
    password: password,
    name: name,
    cart: cart ? cart : [],
  };

  console.log(newCustomer);

  // this is making the backend crash even is it's correctly returning in insomnia
  Object.keys(newCustomer).forEach((key) => {
    if (!newCustomer[key]) {
      return response.status(400).json({
        status: 400,
        data: newCustomer,
        message: "missing information",
      });
    }
  });

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("project_ecom");
    await db.collection("customers").insertOne(newCustomer);
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



const getCustomerInfos = async (request, response) => {

}


module.exports = {
  getProducts,
  addCustomer,
  getCustomerInfos
};
