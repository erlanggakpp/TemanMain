const express = require("express");
const app = express();
const router = require("./routers/index.js");
const cors = require("cors");
const port = 4003;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
// app.listen(port, () => {
//   console.log(`App is listening to ${port}`);
// });

module.exports = app;
