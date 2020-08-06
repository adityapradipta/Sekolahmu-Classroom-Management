require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/index.js");
const cors = require("cors");
const http = require("http");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

http.createServer(app).listen(port, function () {
  console.log(`app listen to port ${port}`);
});
