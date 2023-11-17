"use strict";

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
  const { email, password, firstName, lastName, cart } = request.body;

  //create new customer document. ignore unwanted keys and create id
  const newCustomer = {
    _id: uuidv4(),
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    cart: cart ? cart : [],
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

  //MORE VALIDATION NEEDED!

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
  const { email, password } = request.body;

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("project_ecom");
    const result = await db
      .collection("customers")
      .find({ email: email })
      .toArray();

    const customerInfos = result[0];

    // check if email and password match. result error if not. Delete password key from data if valid.
    if (email === customerInfos.email && password === customerInfos.password) {
      delete customerInfos.password;
    } else {
      return response.status(400).json({
        status: 400,
        data: request.body,
        message: "invalide email or password",
      });
    }
    console.log(customerInfos);

    //MORE VALIDATION NEEDED!
    //the customerInfos array should not have more then one result with the same email

    response.status(201).json({
      status: 201,
      data: { ...customerInfos },
      message: "email found with matching password",
    });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ status: 500, data: {}, message: "unknow error as occured" });
  } finally {
    client.close();
  }
};

module.exports = {
  getProducts,
  addCustomer,
  getCustomerInfos,
};
