require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../backend/src/config/db");
const userRoutes = require("../backend/src/routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api", userRoutes);

// connect to DB
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(cors({
  origin: 'http://localhost:3000', //frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));