const express = require("express");
const cors = require("cors");
const { __prod__ } = require("./const");
const app = express();
const port = process.env.PORT || 3000;

if (!__prod__) {
  console.log("development");
  require("dotenv").config();
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use(express.static("uploads"));
app.use("/posts", require("./routes/posts"));

app.listen(port, () => {
  console.log("aplicacion ejecutandose en el puerto: ", port);
});
