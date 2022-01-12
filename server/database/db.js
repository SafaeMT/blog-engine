require("dotenv").config();
const { MongoClient } = require("mongodb");

const DB_PORT = process.env.DB_PORT;
const PROTOCOL = process.env.DB_PROTOCOL;
const USER = process.env.MONGO_INITDB_ROOT_USERNAME;
const PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const HOST = process.env.DB_HOST;
const URI = `${PROTOCOL}://${USER}:${PASSWORD}@${HOST}:${DB_PORT}`;

async function makeDb() {
  // Create the database client
  const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Connect to database
  client
    .connect()
    .then(async () => {
      console.log(">> Connected correctly to the database");
      const db = client.db();
      const doc = { title: "Alpha Centauri", category: "Astronomy" };
      const result = await db.collection("articles").insertOne(doc);
      console.log(`The document was inserted with the _id: ${result.insertedId}`);
    })

    .catch((err) => {
      console.log(err.stack);
    });
}

module.exports = makeDb;
