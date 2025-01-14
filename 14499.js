const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  let idx = 0
  const [n, m, x, y, k] = input[idx++].split(' ').map(Number);
  const map = [];
  for(let i = 0; i < n; i++) {
    map.push(input[idx++].split(' ').map(Number));
  }
  const command = input[idx++].split(' ').map(Number);
  
  const cur = [x, y];
  const dice = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    front: 0,
    back: 0  
  }

  for (const com of command) {
    const {top, bottom, left, right, front, back} = dice;
    if (com === 1) {
      if (cur[1] + 1 >= m) {
        continue;
      }
      cur[1] += 1;
      dice.top = left;
      dice.bottom = right;
      dice.left = bottom;
      dice.right = top;
    } else if (com === 2) {
      if (cur[1] - 1 < 0) {
        continue;
      }
      cur[1] -= 1;
      dice.top = right;
      dice.bottom = left;
      dice.left = top;
      dice.right = bottom;
    } else if (com === 3) {
      if (cur[0] - 1 < 0) {
        continue;
      }
      cur[0] -= 1;
      dice.top = front;
      dice.bottom = back;
      dice.front = bottom;
      dice.back = top;
    } else if (com === 4) {
      if (cur[0] + 1 >= n) {
        continue;
      }
      cur[0] += 1;
      dice.top = back;
      dice.bottom = front;
      dice.front = top;
      dice.back = bottom;
    }
    
    if (map[cur[0]][cur[1]] === 0) {
      map[cur[0]][cur[1]] = dice.bottom;
    } else {
      dice.bottom = map[cur[0]][cur[1]];
      map[cur[0]][cur[1]] = 0;
    }
    
    console.log(dice.top);
  }
});