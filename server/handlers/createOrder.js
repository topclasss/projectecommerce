const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const { v4: uuidv4 } = require("uuid");

const createOrder = async (request, response) => {
  const { customerId, address, postalCode, provinceState, country } =
    request.body;

  //build the order object
  let order = {
    _id: uuidv4(),
    orderDate: new Date(),
    customerId: customerId,
    buyerName: "place holder",
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
    if (customerDocument.cart.length === 0) {
      return response.status(400).json({
        status: 400,
        data: customerDocument,
        message: "this customer's cart is empty",
      });
    }

    //add buyer name to the order
    order.buyerName =
      customerDocument.firstName + " " + customerDocument.lastName;

    //destructure cart for shorter call
    const { cart } = customerDocument;

    //loop over items in the cart and find a their corresponding document in the db and store it in an array
    const findShoppingList = cart.map((cartProduct) => {
      return db.collection("items").findOne({ _id: Number(cartProduct._id) });
    });
    const dbShoppingList = await Promise.all(findShoppingList);

    //validate if items in the cart where found in the db
    const isProductMissing = dbShoppingList.some((product) => !product);
    if (isProductMissing) {
      return response.status(400).json({
        status: 400,
        data: {},
        message: "at least one product id wasn't found in the db",
      });
    }

    // check if theres sufficient quantities in stock and push id in an array
    lowStockProducts = [];
    for (let index = 0; index < cart.length; index++) {
      if (cart[index].quantity > dbShoppingList[index].numInStock) {
        lowStockProducts.push(cart[index]._id);
      }
    }

    //send error if one or more products has insificient quantity
    if (lowStockProducts.length > 0) {
      return response.status(400).json({
        status: 400,
        data: lowStockProducts,
        message: "insuficient stock. See data from problematic product IDs",
      });
    }

    //push useful product infos in the shoppingBag
    dbShoppingList.forEach((dbProduct) => {
      order.shoppingBag.push({
        _id: dbProduct._id,
        name: dbProduct.name,
        price: dbProduct.price,
        // imageSrc: dbProduct.imageSrc,
      });
    });

    response
      .status(200)
      .json({ status: 200, data: order, message: "order successfully passed" });

    //update quantities in the items db
    const updateStocks = cart.map((cartProduct) => {
      return db
        .collection("items")
        .updateOne(
          { _id: Number(cartProduct._id) },
          { $inc: { numInStock: -cartProduct.quantity } }
        );
    });

    const updateConfirmations = await Promise.all(updateStocks);
    
    //log its there was a problem with the update
    updateConfirmations.forEach((confirmation)=> {
      confirmation.modifiedCount === 0 && console.log("An item stock number wasn't updated correctly");
    })

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
