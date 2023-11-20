"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

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
          { $pull: { cart: { "cart.$._id": inCartProduct.id } } }
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

module.exports = removeFromCart;
