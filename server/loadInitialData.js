const pizzaData = [
  {
    name: "Hawaiian",
    toppings: ["ham", "pineapple", "cheese"],
    price: 10,
  },
  {
    name: "Pepperoni",
    toppings: ["pepperoni", "cheese"],
    price: 9,
  },
  {
    name: "Veggie",
    toppings: ["olives", "mushrooms", "onions", "cheese"],
    price: 8,
  },
  {
    name: "Meat Lovers",
    toppings: ["beef", "chicken", "bacon", "cheese"],
    price: 12,
  },
  {
    name: "Veggie",
    toppings: ["olives", "mushrooms", "onions", "cheese"],
    price: 8,
  },
];

// import models
const Pizza = require("./models/pizza");

// load data
const loadInitialData = async () => {
  // load pizzas
  for (let pizza of pizzaData) {
    await Pizza.create(pizza);
    console.log(Pizza);
  }
  console.log("Pizzas loaded");
};

loadInitialData();
