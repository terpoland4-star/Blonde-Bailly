const express = require("express");
const router = express.Router();
const db = require("../db.json");
const { v4: uuid } = require("uuid");

router.post("/", (req, res) => {
  const booking = {
    id: uuid(),
    service: req.body.service,
    date: req.body.date,
    createdAt: new Date()
  };

  db.bookings.push(booking);
  res.json(booking);
});

router.get("/", (req, res) => {
  res.json(db.bookings);
});

module.exports = router;
