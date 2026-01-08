const express = require("express");
const app = express();
const Fruit = require("./models/fruit");

//Middlewares
require("./db/connection"); // load in the JS and connect to MongoDB
// Allow my app to use form data - adds formdata to req.body
app.use(express.urlencoded({ extended: true }));

// Routes
//Landing Page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// I.N.D.U.C.E.S

// Index - GET /fruits - render all the fruits
app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  res.render("fruits/index.ejs", { allFruits });
});

// New - GET /fruits/new - render the new fruits form
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});

// Delete - DELETE /fruits/:fruitId - delete a specific fruit from the DB(database)

// Update - PUT /fruits/:fruitId (req.body) - update a specific fruit using req.body

// Create - POST /fruits - use req.body to create a new fruit
app.post("/fruits", async (req, res) => {
  console.log(req.body);
  req.body.isReadyToEat = req.body.isReadyToEat === "on" ? true : false;

  await Fruit.create(req.body);

  res.redirect("/fruits/");
});

// Edit - GET /fruits/fruitId/edit - render a pre-populated form to edit the fruit

// Show - Get /fruits/:fruitId - render a specific fruit from the DB(database)

app.listen(3000, () => {
  console.log("Where are the fruits?: 3000");
});
