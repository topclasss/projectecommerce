const {MongoClient} = require("mongodb");
require("dotenv").config();
const{MONGO_URI} = process.env;

const companies = require("./data/companies.json")

const items = require("./data/items.json")

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("project_ecom");
    //import flights collection
    await db.collection("companies").insertMany(companies);
    //import reservation collection
    await db.collection("items").insertMany(items);
    console.log("import completed");
  } catch (error) {
    console.error(error);
  }
  client.close();
};

batchImport();