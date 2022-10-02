require('dotenv').config();
const mongoose = require('mongoose');
const { Counter } = require('./counter-db');

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  await Counter.deleteMany({});
  console.log(`==> Data is cleared`);

  await mongoose.disconnect();
}

main();
