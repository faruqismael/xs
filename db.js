const mongoose = require("mongoose");

module.exports = function connectDB() {
  mongoose.connect(
    "mongodb://localhost:27017/xs",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("db connected ...");
    }
  );
};
