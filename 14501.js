const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  let idx = 0;
  const N = parseInt(input[idx++]);
  const schedule = [];
  for (let i = 0; i < N; i++) {
    schedule.push(input[idx++].split(' ').map(Number));
  }

  const dp = Array.from({ length: N + 1 }, () => 0);
  for (let i = 0; i < N; i++) {
    if (i + schedule[i][0] > N) continue;
    for (let j = i + schedule[i][0]; j < N + 1; j++) {
      if (dp[i] + schedule[i][1] > dp[j]) dp[j] = dp[i] + schedule[i][1];
    }
  }

  console.log(Math.max(...dp));
});