require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");

const DB_PORT = process.env.DB_PORT;
const PROTOCOL = process.env.DB_PROTOCOL;
const USER = process.env.MONGO_INITDB_ROOT_USERNAME;
const PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const HOST = process.env.DB_HOST;
const URI = `${PROTOCOL}://${USER}:${PASSWORD}@${HOST}:${DB_PORT}`;
const DB_NAME = process.env.MONGO_INITDB_DATABASE;

module.exports = async function makeDb() {
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
    db.makeId = makeObjectId;
    return db;
  } catch (err) {
    console.log(err.stack);
  }
};

function makeObjectId(id) {
  return new ObjectId(id);
}
