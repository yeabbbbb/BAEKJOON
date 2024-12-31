const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
let idx = 0;

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const trial = parseInt(input.shift());

  for (let t = 0; t < trial; t++) {
    const [bNum, rNum] = input[idx++].split(' ').map(Number);
    const cost = [0, ...input[idx++].split(' ').map(Number)];
    const inDegree = Array(bNum + 1).fill(0);
    const bGraph = Array.from({ length: bNum + 1 }, () => []);

    for (let r = 0; r < rNum; r++) {
      const [bOut, bIn] = input[idx++].split(' ').map(Number);
      inDegree[bIn] ++;
      bGraph[bOut].push(bIn);
    }

    const dpCost = Array(bNum + 1).fill(0);
    const queue = [];

    for (let i = 1; i <= bNum; i++) {
      if (inDegree[i] === 0) {
        queue.push(i);
      }
      dpCost[i] = cost[i];
    }

    while (queue.length > 0) {
      const cur = queue.shift();

      for (const next of bGraph[cur]) {
        dpCost[next] = Math.max(dpCost[cur] + cost[next], dpCost[next]);
        inDegree[next] -= 1;

        if (inDegree[next] === 0) queue.push(next);
      }
    }

    const target = parseInt(input[idx++]);
    console.log(dpCost[target]);
  } 
});