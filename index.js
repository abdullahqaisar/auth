const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require(`./routes/auth.routes`);

require("dotenv").config();

const app = express();

app.use(express.json());
const dbURI = process.env.MONGODB_URI;
console.log(dbURI)
mongoose.connect(dbURI).then(() => console.log(`Connected to ${dbURI} (MongoDB)...`));

app.use("/api/auth", authRoutes);

const port = 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;
