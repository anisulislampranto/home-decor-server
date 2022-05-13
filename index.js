const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const fileUpload = require("express-fileupload");

const port = process.env.PORT || 4040;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9uobc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("Hello World!");
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

    // get all products from db
    app.get("/products", async (req, res) => {
      const cursor = productCollection.find({});
      const products = await cursor.toArray();
      res.json(products);
    });

    // add single product to db
    app.post("/addproduct", async (req, res) => {
      const name = req.body.name;
      const price = req.body.price;
      const catagory = req.body.catagory;
      const image = req.files.image;
      const imageData = image.data;
      const encodedImage = imageData.toString("base64");
      const imageBuffer = Buffer.from(encodedImage, "base64");

      const product = {
        name,
        price,
        catagory,
        image: imageBuffer,
      };

      const result = await productCollection.insertOne(product);
      res.json(result);
    });
  } finally {
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
