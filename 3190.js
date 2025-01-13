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
  const boardSize = parseInt(input[idx++]);
  const appleNum = parseInt(input[idx++]);

  const apple = [];
  for (let a = 0; a < appleNum; a++) {
    apple.push(input[idx++].split(' ').map(Number));
  }

  const turnNum = parseInt(input[idx++]);

  const turn = [];
  for (let t = 0; t < turnNum; t++) {
    const turnInput = input[idx++].split(' ');
    turn.push([parseInt(turnInput[0]), ...turnInput.slice(1)]);
  }

  const board = Array.from(Array(boardSize), () => Array(boardSize).fill(0));
  for (let a = 0; a < appleNum; a++) {
    const [r, l] = apple[a];
    board[r-1][l-1] = 2;
  }
  board[0][0] = 1;
  
  let time = 0;
  let tIdx = 0;
  const direction = {
    0: [-1, 0],
    90: [0, 1],
    180: [1, 0],
    270: [0, -1]
  };
  let angle = 90;
  const cur = [0, 0];
  const snake = [];
  snake.push([...cur]);

  while (true) {
    time++;
    cur[0] += direction[angle][0];
    cur[1] += direction[angle][1];
    snake.push([...cur]);

    if (cur[0] >= boardSize || cur[1] >= boardSize) break;
    else if (cur[0] < 0 || cur[1] < 0) break;
    else if (board[cur[0]][cur[1]] === 1) break;

    if (board[cur[0]][cur[1]] != 2) {
      tail = snake.shift();
      board[tail[0]][tail[1]] = 0;
    }
    board[cur[0]][cur[1]] = 1;

    if (tIdx < turnNum && turn[tIdx][0] === time) {
      if (turn[tIdx][1] === 'D') angle = (angle + 90) % 360;
      else if (turn[tIdx][1] === 'L') angle = (angle + 270) % 360;
      tIdx++;
    }
  }

  console.log(time);
});