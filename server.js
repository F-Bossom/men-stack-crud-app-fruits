const express = require("express");
const app = express();
const Fruit = require("./models/fruit");
const morgan = require("morgan");
const methodOverride = require("method-override");
const fruitController = require("./controllers/fruitController");

// Middlewares
require("./db/connection"); // Load in this JS and connect to MongoDB
// Allow my app to use form data - adds formdata to req.body
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // logs request  details to the console
app.use(express.static("public")); // Serve static files from public folder
/* 
  MethodOverride checks the url for a query param of method and will process the reques
  as the methods we provide
  /fruits/12345?_method=PUT
*/
app.use(methodOverride("_method")); // Overrides Request so we can use Put or Delete
// routes
// Landing Page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// attach all the routes from the controller to our app
app.use(fruitController);

app.get("/*splat", (req, res) => {
  res.render("404.ejs", { url: req.url });
});

app.listen(3000, () => {
  console.log("Where are the fruits?: 3000");
});
