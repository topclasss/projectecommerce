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

//***This one shouldn't be needed for now. Use the ContextProducts instead***
const getProduct = async (request, response) => {
  const client = new MongoClient(MONGO_URI);
  const _id = Number(request.params.id);
  try {
    await client.connect();
    const db = client.db("project_ecom");
    const product = await db.collection("items").findOne({ _id: _id });
    product &&
      response.status(200).json({
        status: 200,
        data: product,
        message: "success! product found",
      });
    !product &&
      response.status(404).json({
        status: 404,
        data: request.params.id,
        message: "product id not found",
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

  //MORE VALIDATION NEEDED!

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
    

    //MORE VALIDATION NEEDED!
    //the result array should not have more then one result with the same email

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

const addToCart = async (request, response) => {
  const { customerId, productId } = request.body;

  //validation for missing information
  if (!customerId || !productId) {
    return response.status(400).json({
      status: 400,
      data: request.body,
      message:
        "missing information or invalide key naming (Should be customerId and productId)",
    });
  }

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("project_ecom");
    const customerDocument = await db
      .collection("customers")
      .findOne({ _id: customerId });
    const productDocument = await db
      .collection("items")
      .findOne({ _id: Number(productId) });

    //validate if customer was found
    if (!customerDocument) {
      return response.status(404).json({
        status: 404,
        data: request.body,
        message: "customer id doens't exist in the database",
      });
    }
    //validate if product was found
    if (!productDocument) {
      return response.status(404).json({
        status: 404,
        data: request.body,
        message: "product id doesn't exist in the database",
      });
    }

    //validate if item not out of stock
    if (productDocument.numInStock < 1) {
      return response.status(400).json({
        status: 400,
        data: request.body,
        message: "product out of stock",
      });
    }

    // check if the product is already in cart and store it or null in the variable
    const inCartProduct = customerDocument.cart.find(
      (product) => product._id === productId
    );

    //validate if enough stock to add one more
    if (
      inCartProduct &&
      inCartProduct.quantity + 1 > productDocument.numInStock
    ) {
      return response.status(400).json({
        status: 400,
        data: request.body,
        message: "not enough of this product left in stock",
      });
    }

    // update mongo and add product in cart or increase quantity
    if (inCartProduct) {
      const result = await db
        .collection("customers")
        .updateOne(
          { _id: customerId, "cart._id": productId },
          { $inc: { "cart.$.quantity": 1 } }
        );

      result.modifiedCount === 1 &&
        response.status(200).json({
          status: 200,
          data: { _id: productId, quantity: inCartProduct.quantity + 1 },
          message: "quantity of existing product successfully incremented",
        });
    } else {
      const result = await db
        .collection("customers")
        .updateOne(
          { _id: customerId },
          { $push: { cart: { _id: productId, quantity: 1 } } }
        );
      response.status(200).json({
        status: 200,
        data: { _id: productId, quantity: 1 },
        message: "new product successfully added to cart",
      });
    }
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ status: 500, data: {}, message: "unknow error as occured" });
  } finally {
    client.close();
  }
};

const removeFromCart = async (request, response) => {
  const { customerId, productId } = request.body;

  //validation for missing information
  if (!customerId || !productId) {
    return response.status(400).json({
      status: 400,
      data: request.body,
      message:
        "missing information or invalide key naming (Should be customerId and productId)",
    });
  }

  const client = new MongoClient(MONGO_URI);
  try {
    //find customer and product on Mongo
    await client.connect();
    const db = client.db("project_ecom");
    const customerDocument = await db
      .collection("customers")
      .findOne({ _id: customerId });
    const productDocument = await db
      .collection("items")
      .findOne({ _id: Number(productId) });

    //validate if customer was found
    if (!customerDocument) {
      return response.status(404).json({
        status: 404,
        data: request.body,
        message: "customer id doens't exist in the database",
      });
    }

    //validate if product was found
    if (!productDocument) {
      return response.status(404).json({
        status: 404,
        data: request.body,
        message: "product id doesn't exist in the database",
      });
    }

    // check if the product is already in cart and store it or null in the variable
    const inCartProduct = customerDocument.cart.find(
      (product) => product._id === productId
    );

    //validate if the product is the customer's cart
    if (!inCartProduct) {
      return response.status(404).json({
        status: 404,
        data: request.body,
        message:
          "this product is not in this customer's cart according to the database",
      });
    }

    // update mongo and remove product from cart or decrease quantity
    if (inCartProduct.quantity > 1) {
      const result = await db
        .collection("customers")
        .updateOne(
          { _id: customerId, "cart._id": productId },
          { $inc: { "cart.$.quantity": -1 } }
        );

      result.modifiedCount === 1 &&
        response.status(200).json({
          status: 200,
          data: { _id: productId, quantity: inCartProduct.quantity - 1 },
          message: "quantity of existing product successfully decreased",
        });
    } else {
      const result = await db
        .collection("customers")
        .updateOne(
          { _id: customerId, "cart._id": productId },
          { $pull: { cart : {"cart.$._id" : inCartProduct.id} } }
        );
      result.modifiedCount === 1 &&
        response.status(200).json({
          status: 200,
          data: {},
          message: "product successfully removed from cart",
        });
    }
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
  getProduct,
  addCustomer,
  getCustomerInfos,
  addToCart,
  removeFromCart,
};
