"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const getCompany = async (request, response) => {
  const client = new MongoClient(MONGO_URI);
  const _id = Number(request.params.id);
  try {
    await client.connect();
    const db = client.db("project_ecom");
    const company = await db.collection("companies").findOne({ _id: _id });
    company &&
      response.status(200).json({
        status: 200,
        data: company,
        message: "success! company found",
      });
    !company &&
      response.status(404).json({
        status: 404,
        data: request.params.id,
        message: "company id not found",
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

module.exports = getCompany