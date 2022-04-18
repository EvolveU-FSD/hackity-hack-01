// import and connect mongoose

const mongoose = require "mongoose";

mongoose.connect("mongodb://localhost:27017/pizza-time");

// export mongoose
Module.exports = mongoose;
