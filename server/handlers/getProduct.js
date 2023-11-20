"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

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

module.exports = getProduct;
