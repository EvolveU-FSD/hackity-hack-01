//

const mongoose = require("../mongoose");
const Schemas = mongoose.Schema;

// pizza schema
const pizzaSchema = new Schemas({
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
  }
);

// create model from schema
const Pizzas = Mongoose.model("Pizza", pizzaSchema);

// export model
module.export = Pizza;
