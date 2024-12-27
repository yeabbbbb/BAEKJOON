const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
let trial = null;

rl.on('line', (line) => {
  if (trial == null) {
    trial = parseInt(line);
  } else {
    input.push(line);
    if (input.length == trial) {
      rl.close();
    }
  }
}).on('close', () => {
  for (let i = 0; i < trial; i++) {
    const n = parseInt(input[i]);
  
    let zero = 1
    let one = 0
    for (let j = 1; j <= n; j++) {
      let temp = zero + one;
      zero = one;
      one = temp;
    }
  
    console.log(`${zero} ${one}`);
  }
});