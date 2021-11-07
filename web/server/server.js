const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const addSample = require("./routes/addSample")

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/addSample",  addSample);

app.listen(PORT, function(){
  console.log("Server is running on Port:",PORT);
});

