const { spawn } = require('child_process');

const clearData = spawn('node', ['src/clear-data.js']);
clearData.stdout.pipe(process.stdout);
clearData.stderr.pipe(process.stderr);

let consumers = [];

clearData.on('exit', () => {
  for (let i = 0; i < 5; i++) {
    consumers.push(spawn('node', ['src/consumer.js']));
  }

  const producer = spawn('node', ['src/producer.js']);
  producer.stdout.pipe(process.stdout);
  producer.stderr.pipe(process.stderr);

  producer.on('exit', () => {
    console.log(
      'Producer exited. Wait 5 seconds for consumers process all messages'
    );
    setTimeout(() => {
      consumers.map((c) => c.kill());
      console.log('Consumers exited. Start verifier');

      const verifier = spawn('node', ['src/verifier.js']);

      verifier.stdout.pipe(process.stdout);
      verifier.stderr.pipe(process.stderr);
    }, 5000);
  });
});
