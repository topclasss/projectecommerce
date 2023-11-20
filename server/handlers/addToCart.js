"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

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

module.exports = addToCart;
