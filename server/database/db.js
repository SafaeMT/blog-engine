require("dotenv").config();
const { MongoClient } = require("mongodb");
const posts = require("../data/posts");

const DB_PORT = process.env.DB_PORT;
const PROTOCOL = process.env.DB_PROTOCOL;
const USER = process.env.MONGO_INITDB_ROOT_USERNAME;
const PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const HOST = process.env.DB_HOST;
const URI = `${PROTOCOL}://${USER}:${PASSWORD}@${HOST}:${DB_PORT}`;
const DB_NAME = process.env.DB_NAME;

async function makeDb() {
  // Create the database client
  const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Connect to database
  try {
    await client.connect();
    console.log(">> Connected correctly to the database");
    const db = client.db(DB_NAME);
    if ((await db.collection("posts").countDocuments()) !== 0) {
      await db.collection("posts").drop();
    }
    const result = await db.collection("posts").insertMany(posts);
    console.log(`>> ${result.insertedCount} documents have been inserted`);
    return db;
  } catch (err) {
    console.log(err.stack);
  }
}

module.exports = makeDb;
