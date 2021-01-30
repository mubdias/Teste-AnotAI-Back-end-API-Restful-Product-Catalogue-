const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoute = require("./routes/productRoute");
const app = express();
dotenv.config();

mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to database!')
);

app.use(express.json());
app.use("/api/product", productRoute);
app.listen(3000, () => {
    console.log("Server running!")
});