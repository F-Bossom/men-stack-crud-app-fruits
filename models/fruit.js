const mongoose = require("mongoose")

// set up a schema
const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean
})

//set up a model
const Fruit = mongoose.model("Fruit", fruitSchema)

// export this model to be used in other files
module.exports = Fruit