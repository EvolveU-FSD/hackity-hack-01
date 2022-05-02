// jest test file for pizza routes
// import request
const request = require("supertest");

// import app
const app = require("../server");
// import models
const Pizza = require("../models/pizza");
// express testing
const mongoose = require("../mongoose");
const Order = require("../models/order");
// express testing
describe("pizzas", () => {
  beforeEach(async () => {
    await Pizza.deleteMany({});
  });

  test("POST /pizza creates a pizza", async () => {
    const pizza = {
      name: "Hawaiian",
      toppings: ["ham", "pineapple", "cheese"],
      price: 10,
    };
    const response = await request(app).post("/pizza").send(pizza);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(pizza);
    expect(response.body._id).toBeDefined();
  });

  test("GET /pizza returns all pizzas", async () => {
    const pizzas = [
      {
        name: "Hawaiian",
        toppings: ["ham", "pineapple", "cheese"],
        price: 10,
      },
      {
        name: "Pepperoni",
        toppings: ["pepperoni", "cheese"],
        price: 10,
      },
    ];
    await Pizza.create(pizzas);
    const response = await request(app).get("/pizza");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toMatchObject(pizzas[0]);
    expect(response.body[1]).toMatchObject(pizzas[1]);
  });

  test("GET /pizza/:id returns a pizza", async () => {
    const pizza = {
      name: "Hawaiian",
      toppings: ["ham", "pineapple", "cheese"],
      price: 10,
    };
    const response = await request(app).post("/pizza").send(pizza);
    const { _id } = response.body;
    const response2 = await request(app).get(`/pizza/${_id}`);
    expect(response2.status).toBe(200);
    expect(response2.body).toMatchObject(pizza);
  });

  test("PUT /pizza/:id updates a pizza", async () => {
    const pizza = {
      name: "Hawaiian",
      toppings: ["ham", "pineapple", "cheese"],
      price: 10,
    };
    const response = await request(app).post("/pizza").send(pizza);
    const { _id } = response.body;
    const updatedPizza = {
      name: "Pepperoni",
      toppings: ["pepperoni", "cheese"],
      price: 10,
    };
    const response2 = await request(app)
      .put(`/pizza/${_id}`)
      .send(updatedPizza);
    expect(response2.status).toBe(200);
    expect(response2.body).toMatchObject(updatedPizza);
  });

  test("DELETE /pizza/:id deletes a pizza", async () => {
    const pizza = {
      name: "Hawaiian",
      toppings: ["ham", "pineapple", "cheese"],
      price: 10,
    };
    const response = await request(app).post("/pizza").send(pizza);
    const { _id } = response.body;
    const response2 = await request(app).delete(`/pizza/${_id}`);
    expect(response2.status).toBe(200);
    expect(response2.body).toMatchObject(pizza);
  });

  test("creating a pizza with duplicate name fails", async () => {
    const pizza = {
      name: "Hawaiian",
      toppings: ["ham", "pineapple", "cheese"],
      price: 10,
    };
    await request(app).post("/pizza").send(pizza);
    const response = await request(app).post("/pizza").send(pizza);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  test("get pizza with invalid id returns Error", async () => {
    const response = await request(app).get("/pizza/123");
    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  test("update pizza with invalid id returns Error", async () => {
    const response = await request(app).put("/pizza/123");
    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  test("delete pizza with invalid id returns Error", async () => {
    const response = await request(app).delete("/pizza/123");
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
});
describe("orders", () => {
  beforeEach(async () => {
    await Order.deleteMany({});
  });

  test("POST /order creates an order", async () => {
    const order = {
      pizzas: [
        {
          name: "Hawaiian",
          toppings: ["ham", "pineapple", "cheese"],
          price: 10,
        },
      ],
      total: 10,
      status: "pending",
    };

    const response = await request(app).post("/order").send(order);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(order);
    expect(response.body._id).toBeDefined();
  });

  test("order with no pizzas fails", async () => {
    const order = {
      total: 10,
      status: "pending",
    };
    const response = await request(app).post("/order").send(order);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
  test("order with no total fails", async () => {
    const order = {
      pizzas: [
        {
          name: "Hawaiian",
          toppings: ["ham", "pineapple", "cheese"],
          price: 10,
        },
      ],
      status: "pending",
    };
    const response = await request(app).post("/order").send(order);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
  test("order with no status fails", async () => {
    const order = {
      pizzas: [
        {
          name: "Hawaiian",
          toppings: ["ham", "pineapple", "cheese"],
          price: 10,
        },
      ],
      total: 10,
    };
    const response = await request(app).post("/order").send(order);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
  test("delete order", async () => {
    const order = {
      pizzas: [
        {
          name: "Hawaiian",
          toppings: ["ham", "pineapple", "cheese"],
          price: 10,
        },
      ],
      total: 10,
      status: "pending",
    };
    const response = await request(app).post("/order").send(order);
    const { _id } = response.body;
    const response2 = await request(app).delete(`/order/${_id}`);
    expect(response2.status).toBe(200);
  });
  test("update order", async () => {
    const order = {
      pizzas: [
        {
          name: "Hawaiian",
          toppings: ["ham", "pineapple", "cheese"],
          price: 10,
        },
      ],
      total: 10,
      status: "pending",
    };
    const response = await request(app).post("/order").send(order);
    const { _id } = response.body;
    const updatedOrder = {
      pizzas: [
        {
          name: "Hawaiian",
          toppings: ["ham", "pineapple", "cheese"],
          price: 10,
        },
      ],
      total: 10,
      status: "pending",
    };
    const response2 = await request(app)
      .put(`/order/${_id}`)
      .send(updatedOrder);
    expect(response2.status).toBe(200);
    expect(response2.body).toMatchObject(updatedOrder);
  });
  test("get order", async () => {
    const order = {
      pizzas: [
        {
          name: "Hawaiian",
          toppings: ["ham", "pineapple", "cheese"],
          price: 10,
        },
      ],
      total: 10,
      status: "pending",
    };
    const response = await request(app).post("/order").send(order);
    const { _id } = response.body;
    const response2 = await request(app).get(`/order/${_id}`);
    expect(response2.status).toBe(200);
    expect(response2.body).toMatchObject(order);
  });
  test("get all orders", async () => {
    const order = {
      pizzas: [
        {
          name: "Hawaiian",
          toppings: ["ham", "pineapple", "cheese"],
          price: 10,
        },
      ],
      total: 10,
      status: "pending",
    };
    await request(app).post("/order").send(order);
    const response2 = await request(app).get("/order");
    expect(response2.status).toBe(200);
    expect(response2.body).toMatchObject([order]);
  });

  test("invalid id returns Error", async () => {
    const response = await request(app).get("/order/123");
    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  test("invalid id on delete returns Error", async () => {
    const response = await request(app).delete("/order/123");
    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  test("invalid id on update returns Error", async () => {
    const response = await request(app).put("/order/123");
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

