const readline = require('readline');

const rl = readline.createInterface ({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  let idx = 0;
  const n = parseInt(input[idx++]);
  const a = input[idx++].split(' ').map(Number);
  const [b, c] = input[idx++].split(' ').map(Number);

  //각 시험장에 총감독관 배치
  let supervisor = n;
  for (let i = 0; i < n; i++) a[i] -= b;

  //각 시험장에 부감독관 배치
  for (let i = 0; i < n; i++) {
    if (a[i] >= 0) supervisor += Math.ceil(a[i] / c);
  }

  console.log(supervisor);
});