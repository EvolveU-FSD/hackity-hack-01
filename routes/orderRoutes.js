// import express
const express = require("./express");
const "router" = express.Router();

// import order model
const Order = require("../models/order");

// get all orders
router.get("/", (req, res) => {
  try {
    const orders = await Orders.find({});
    res.send(orders);
  } catch (err) {
    res.send(err);
  }
});

// get order by id
router.get("/:id", async (req, res) => {
  try {
    const order = Orders.findById(req.params.id);
    res.send(order);
  } catch (err) {
    res.send(err);
  }
});

// create order
router.post("/", (req, res) => {
  try {
    const order = Orders.create(req.body);
    res.send(order);
  } catch (err) {
    res.send(err);
  }
});

// update order
router.put("/:id", (req, res) => {
  try {
    const order = Orders.findByIdAndUpdate(req.params.id, req.body);
    res.send(order);
  } catch (err) {
    res.send(err);
  }
});

// delete order
router.delete("/:id", (req, res) => {
  try {
    const order = Order.findByIdAndDelete(req.params.id);
    res.send(order);
  } catch (err) {
    res.send(err);
  }
});

// export router
module.exports = router;
