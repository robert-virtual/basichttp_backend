const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/posts", require("./routes/posts"));

app.listen(port, () => {
  console.log("aplicacion ejecutandose en el puerto: ", port);
});
