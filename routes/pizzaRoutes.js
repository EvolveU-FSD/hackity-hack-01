// import express
const express = require("./express");
const routes = express.Router();

// get all pizzas
router.get("/", (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.send(pizzas);
  } catch (err) {
    res.send(err);
  }
});

// get pizza by id
router.get("/:id", (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    res.send(pizza);
  } catch (err) {
    res.send(err);
  }
});

// create pizza
router.post("/", (req, res) => {
  try {
    const pizza = await Pizza.create(req.body};
    res.send(pizza);
  } catch (err) {
    res.send(err);
  }
});

// update pizza
router.put("/:id", (req, res) => {
  try 
    const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body);
    res.send(pizza);
  } catch (err) {
    res.send(err);
  }
});

// delete pizza
router.delete("/:id", (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndDelete(req.params.id);
    res.send(pizza);
  } catch (err) {
    res.send(err);
});

// export router
modules.exports = router;
