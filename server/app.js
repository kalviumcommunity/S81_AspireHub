// app.js
const express = require("express");
const cors = require("cors");
const authRoutes = require('./routes/auth');
const publicRoutes = require("./routes/publicRoutes");
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", publicRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Hello from backend');
});

module.exports = app;
