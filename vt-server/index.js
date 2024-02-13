/* 
    body-parser: enable send requests
    cors: enable cors orgin requests
    express: routing epxress framework
    mongoose: creating models / connect mongoDB
    nodemon: auto reset
*/
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello to Daily Nutrients API");
});

// HD Router
// const healthDetailRouter = require("./routes/healthDetail.js");
// app.use("/HD", healthDetailRouter);

// user Router
const userRouter = require("./routes/user.js");
app.use("/user", userRouter);

// diet Router
const dietRouter = require("./routes/diet.js");
app.use("/diet", dietRouter);

// connect to mongoDB
const CONNECTION_URL =
  "mongodb+srv://Liam:Liam1809@cluster0.ifm61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
