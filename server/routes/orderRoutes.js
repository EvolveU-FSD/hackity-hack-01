// import express
const express = require("express");
const router = express.Router();

// import order model
const Order = require("../models/order");

// get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get order by id
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.send(order);
  } catch (err) {
    res.status(400).send(err);
  }
});

// create order
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.send(order);
  } catch (err) {
    res.status(400).send(err);
  }
});

// update order
router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body);
    res.send(order);
  } catch (err) {
    res.status(400).send(err);
  }
});

// delete order
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.send(order);
  } catch (err) {
    res.status(400).send(err);
  }
});

// export router
module.exports = router;
