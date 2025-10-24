const express = require("express");
const cors = require("cors");
const employeeRoute = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", employeeRoute);

const port = 3200;

app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
