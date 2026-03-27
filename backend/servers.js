require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/orders", require("./routes/orders"));
app.use("/bookings", require("./routes/bookings"));
app.use("/mtn", require("./routes/mtn"));

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
