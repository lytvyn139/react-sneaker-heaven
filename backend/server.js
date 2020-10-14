const express = require("express");
const products = require("./data/products");

const app = express();

app.get("/", (req, res) => {
  res.send("API is up....");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:sneakerId", (req, res) => {
  const product = products.find((p) => p._id === req.params.sneakerId);
  res.json(product);
});

console.log("====================================================");
app.listen(
  5000,
  console.log("Express server is running on: http://localhost:5000/")
);
