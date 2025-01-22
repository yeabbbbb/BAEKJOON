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
  const [n, m] = input[idx++].split(' ').map(Number);
  const paper = [];
  for (let i = 0; i < n; i++) paper.push(input[idx++].split(' ').map(Number));

  let maxSum = 0;
  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];
  const dfs = (ly, lx, y, x, depth, sum) => {
    if (depth === 4) {
      maxSum = Math.max(maxSum, sum);
      return;
    }

    for (let k = 0; k < 4; k++) {
      const nx = x + dx[k];
      const ny = y + dy[k];

      if (possible(ny, nx) && !(ny === ly && nx === lx)) {
        dfs(y, x, ny, nx, depth + 1, sum + paper[ny][nx]);
      }
    }
  };
  const notDfs = (y, x) => {
    const type = [
      [[0, -1], [-1, 0], [0, 1]], //ㅗ
      [[-1, 0], [0, 1], [1, 0]], //ㅏ
      [[0, 1], [1, 0], [0, -1]], //ㅜ
      [[1, 0], [0, -1], [-1, 0]] //ㅓ
    ]

    for (const t of type) {
      let sum = paper[y][x];
      for (el of t) {
        if (possible(y + el[0], x + el[1])) {
          sum += paper[y + el[0]][x + el[1]];
        }
        maxSum = Math.max(maxSum, sum);
      }
    }
  };

  function possible(ny, nx) {
    if (ny >= 0 && nx >= 0 && ny < n && nx < m) 
      return true;

    return false;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      dfs(-1, -1, i, j, 0, 0);
      notDfs(i, j);
    }
  }

  console.log(maxSum);
});