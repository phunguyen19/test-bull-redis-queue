require('dotenv').config();
const Queue = require('bull');
const mongoose = require('mongoose');
const { Counter } = require('./counter-db');
const debug = require('debug')('consumer');

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  debug(`Database connected`);

  const videoQueue = new Queue('PDF_GENERATOR', process.env.REDIS_URI);
  debug(`Redis connected`);

  let count = 0;

  await videoQueue.process(async function (job) {
    await Counter.create({ contentId: job.data.contentId });
    ++count;
    debug(`Finish process ${job.data.contentId}. Total finished: ${count}`);
  });
}

main();
