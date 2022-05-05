const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const port = process.env.PORT || 4040;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9uobc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello ak World!");
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const db = client.db("homeDecorDB");
    const productCollection = db.collection("products");
    const doc = {
      name: "solaman kan",
      email: "bhoi@gmail.com",
    };
    const result = await productCollection.insertOne(doc);
    console.log(result);
  } finally {
    await client.close();
  }
}
run().catch(console.dir());

// client.connect((err) => {
//   console.log(err);
//   const collection = client.db("homeDecorDB").collection("products");
//   console.log("db working with");
// });

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
