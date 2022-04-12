const express = require("express");
const cors = require("cors");
const app = express();
const { connect } = require("mongoose");
const bodyParser = require("body-parser");
const { DB, PORT } = require("./config");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(require("./routes/router"));

const startApp = async () => {
  try {
    await connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Successfully connected to the database ... \n ${DB}`);
    app.listen(PORT || 3000, () => {
      console.log("Listening on port " + PORT);
    });
  } catch (err) {
    console.log("Unable to connect to the database ...");
    console.error(err);
  }
};

startApp();
