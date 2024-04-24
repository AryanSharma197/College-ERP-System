const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const adminRoutes = require("./Routes/adminRoutes");

app.use(express.json());
app.use(cors());
app.use("/admin", adminRoutes);

mongoose.connect(`${process.env.MONGO_URI}`).then(()=>console.log("Connected to MongoDB")).catch((err)=>console.log(err));

app.listen(process.env.PORT, ()=>console.log(`Server is running at port ${process.env.PORT}`));