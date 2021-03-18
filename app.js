const express = require("express");
const cors = require("cors");
const path = require("path");
// const productsRoutes = require("./API/product/itsRoutes");
const db = require("./db/models");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/test", (_, res) => {
  res.json("Its working");
});

const run = async () => {
  try {
    await db.sequelize.sync();
    console.log("Connection to the database was successful!");
    await app.listen(8000, () => {
      console.log("Server is runinng good");
    });
  } catch (error) {
    console.log("Error connecting to the db", error);
  }
};
run();
