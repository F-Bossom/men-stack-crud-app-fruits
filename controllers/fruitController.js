const Fruit = require("../models/fruit.js")
const express = require("express")
const router = express.Router() // allows use to attach a group of routes

// I.N.D.U.C.E.S

// Index - GET /fruits - render all the fruits
router.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  res.render("fruits/index.ejs", { allFruits });
});

// New - GET /fruits/new - render the new fruits form
router.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});

// Delete - Delete /fruits/:fruitId - Delete a specific Fruits from the DB
router.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
});

// Update - PUT /fruits/:fruitId (req.body) - Update a specific fruit using req.body
router.put("/fruits/:fruitId", async (req, res) => {
  req.body.isReadyToEat = req.body.isReadyToEat === "on" ? true : false;
  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body)
  res.redirect(`/fruits/${req.params.fruitId}`);
});

// Create - POST /fruits - Use the req.body to create a new Fruit
router.post("/fruits", async (req, res) => {
  console.log(req.body);
  req.body.isReadyToEat = req.body.isReadyToEat === "on" ? true : false;

  await Fruit.create(req.body);

  res.redirect("/fruits/");
});

// Edit - GET /fruits/:fruitId/edit - render a pre populated form to edit the fruit
router.get("/fruits/:fruitId/edit", async (req, res) => {
  const fruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/edit.ejs", { fruit });
});

// Show - GET /fruits/:fruitId - Render a specific fruit from the database
router.get("/fruits/:fruitId", async (req, res) => {
  // const fruit = await Fruit.findById(req.params.fruitId)
  const fruit = await Fruit.findOne({ _id: req.params.fruitId });
  res.render("fruits/show.ejs", { fruit });
});

module.exports = router;