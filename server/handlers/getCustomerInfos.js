"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;



const getCustomerInfos = async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password){
    return response.status(400).json({
      status: 400,
      data: request.body,
      message: "missing information",
    });
  }

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("project_ecom");
    const customerInfos = await db
      .collection("customers")
      .findOne({ email: email })

    

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

module.exports = getCustomerInfos;
