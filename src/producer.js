require('dotenv').config();
const uuid = require('uuid');
const Queue = require('bull');
const { Counter } = require('./counter-db');
const debug = require('debug')('producer');

async function main() {
  const videoQueue = new Queue('PDF_GENERATOR', process.env.REDIS_URI);
  debug(`Redis connected`);

  let size = 10_000;
  let count = 0;
  while (count < size) {
    const contentId = uuid.v4();
    await videoQueue.add({ contentId });
    ++count;
    if (count % 100 === 0) debug(`Total messages sent: ${count}`);
  }

  videoQueue.close();
}

main();
