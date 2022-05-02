//

const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

// pizza schema
const pizzaSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  toppings: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// create model from schema
const Pizza = mongoose.model("Pizza", pizzaSchema);

// export model

module.exports = Pizza;
