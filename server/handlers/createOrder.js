const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const { v4: uuidv4 } = require("uuid");

const createOrder = async (request, response) => {
  const {
    customerId,
    deliveryName,
    address,
    postalCode,
    provinceState,
    country,
  } = request.body;

  //build the order object
  let order = {
    _id: uuidv4(),
    orderDate: new Date(),
    customerId: customerId,
    buyerName: "",
    deliveryName: deliveryName,
    address: address,
    postalCode: postalCode,
    provinceState: provinceState,
    country: country,
    shoppingBag: [],
  };

  //validation for missing information
  let invalideKey = null;
  Object.keys(order).forEach((key) => {
    if (!order[key]) {
      invalideKey = true;
    }
  });
  if (invalideKey) {
    return response.status(400).json({
      status: 400,
      data: order,
      message: "missing information",
    });
  }

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("project_ecom");
    const customerDocument = await db
      .collection("customers")
      .findOne({ _id: customerId });

    //valitate if customer id match
    if (!customerDocument) {
      return response.status(404).json({
        status: 404,
        data: order,
        message: "invalide customer id",
      });
    }

    //validate if cart is empty
    if (customerDocument.cart.lenght < 1) {
      return response.status(400).json({
        status: 400,
        data: order,
        message: "this customer's cart is empty",
      });
    }

    //add buyer name to the order
    order.buyerName = customerDocument.firstName + " " + customerDocument.lastName;

    //destructure cart for shorter call
    const { cart } = customerDocument;

    //this loop checks if all items with according quantity are in stock, update stock quantities and push productinfos in the shoppingBag
    let stockInfo = { isInStock: true, itemsId: [] };
    const promises = cart.map((cartProduct) => {
      return db
        .collection("items")
        .findOne({ _id: Number(cartProduct._id) }); });
        
        const results = await Promise.all(promises);
        console.log(results);
        //check which items are to low in stock not existing, save their id and prevent their quantities from getting modified
        if (!dbProduct || dbProduct.numInStock < cartProduct.quantity) {
          stockInfo.isInStock = false;
          stockInfo.itemsId.push(cartProduct._id);
        } else {
          //update quantities in the items db
          const result = db
            .collection("items")
            .updateOne({ _id: dbProduct._id }, { $inc: { numInStock: -1 } });
          //push useful product infos in the shoppingBag
          result.modifiedCount === 1 &&
            order.shoppingBag.push({
              _id: dbProduct._id,
              name: dbProduct.name,
              price: dbProduct.price,
              imageSrc: dbProduct.imageSrc,
            });
        }

    // send error if items don't have enough stock or non existing product id
    if (!stockInfo.isInStock) {
      return response.status(400).json({
        status: 400,
        data: stockInfo,
        message:
          "Some products don't have enough stock left or id doesn't exist. See data for problematic products id numbers",
      });
    }

    console.log(order);

    //push order document in orders collection
    await db.collection("orders").insertOne(order);

    //update customer document by clearing cart
    await db
      .collection("customer")
      .updateOne({ _id: customerId }, { $set: { cart: [] } });

    //update customer adding this order to previousOrders
    await db
      .collection("customer")
      .updateOne({ _id: customerId }, { $push: { previousOrder: order } });

    //respond to the client with an order id
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ status: 500, data: {}, message: "unknow error as occured" });
  } finally {
    client.close();
  }
};

module.exports = createOrder;
