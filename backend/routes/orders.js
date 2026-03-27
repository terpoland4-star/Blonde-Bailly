const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");
const db = require("../db.json");

router.post("/", (req, res) => {
  const order = {
    id: uuid(),
    items: req.body.items,
    total: req.body.total,
    status: "pending",
    createdAt: new Date()
  };

  db.orders.push(order);
  res.json(order);
});

router.get("/", (req, res) => {
  res.json(db.orders);
});

module.exports = router;
