import express from "express";
import cors from 'cors'
import configViewEngine from "./config/viewEngine";
import initAPIRoute from "./route/api";
import connectDB from "./config/connectDB";
import bodyParser from "body-parser";


require("dotenv").config();
var morgan = require("morgan"); //check log
const app = express();
var corsOptions = {
  origin: "http://localhost:8080",
};

const port = process.env.PORT || 8000;
// -----------------------------------
//-------------------------------------
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors(corsOptions));

//setup view engine
configViewEngine(app);

//init api route
initAPIRoute(app);

connectDB();
//-------------------------------------

//handle 404 notfound//chay sau router
app.use((req, res) => {
  return res.render("404.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
