//test
const express = require("express");
const cors = require("cors");
const path = require("path");
const studentsRoutes = require("./API/student/studentRoute");
const universityRoutes = require("./API/university/uniRoute");
const corsesRoutes = require("./API/course/courseRoute");
const db = require("./db/models");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/students", studentsRoutes);
app.use("/universities", universityRoutes);
app.use("/courses", corsesRoutes);

app.use(
  "/media/Images",
  express.static(path.join(__dirname, "./media/Images"))
);

// Handling errors middlewear
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const run = async () => {
  try {
    // await db.sequelize.sync({ alter: true });
    await db.sequelize.sync();
    console.log("Connection to the database was successful!");
    await app.listen(8001, () => {
      console.log("Server is runinng good");
    });
  } catch (error) {
    console.log("Error connecting to the db", error);
  }
};
run();
