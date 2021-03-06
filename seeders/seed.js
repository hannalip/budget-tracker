const mongoose = require("mongoose");
const db = require("../models");

const MONGODB_URI = process.env.MONGODB_URI  || 'mongodb://localhost/BudgetTracker';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false
})

const transactionSeed = [
  {
    name:{
    type: String,
    trim: true,
    required: "Enter a name for transaction"
  },
  
    value: {
    type: Number,
    required: "Enter an amount"
  },
  date: {
    type: Date,
    default: Date.now
  }
}
];

db.BudgetTracker.deleteMany({})
  .then(() => db.BudgetTracker.collection.insertMany(transactionSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
