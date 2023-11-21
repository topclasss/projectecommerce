"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const getOrderDetails = async (request, response) => {
  const client = new MongoClient(MONGO_URI);
  const _id = Number(request.params.id);
  try {
    await client.connect();
    const db = client.db("project_ecom");
    const order = await db.collection("orders").findOne({ _id: _id });
    order &&
      response.status(200).json({
        status: 200,
        data: order,
        message: "success! order found",
      });
    !order &&
      response.status(404).json({
        status: 404,
        data: request.params.id,
        message: "order id not found",
      });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ status: 500, data: {}, message: "unknow error as occured" });
  } finally {
    client.close();
  }
}

module.exports = getOrderDetails