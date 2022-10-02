require('dotenv').config();
const mongoose = require('mongoose');
const { Counter } = require('./counter-db');
const debug = require('debug')('verifier');

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  debug(`Database connected`);

  const total = await Counter.countDocuments();
  const duplicated = await Counter.aggregate([
    { $group: { _id: '$contentId', count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } },
  ]);

  console.log('==> Total records', total);
  console.log('==> Aggregate duplicated result', duplicated);

  if (duplicated.length) {
    console.log("==> There's duplicated");
  } else {
    console.log(`==> No duplicated`);
  }

  await mongoose.disconnect();
}

main();
