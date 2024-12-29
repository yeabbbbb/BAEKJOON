const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const trial = parseInt(input.shift());
  const answer = [];

  for (let i = 0; i < trial; i++) {
    const [x1, y1, x2, y2] = input.shift().split(' ').map(Number);
    const planetaryNum = parseInt(input.shift());
    const planetary = [];
    let cnt = 0;

    for (let j = 0; j < planetaryNum; j++) {
      planetary.push(input.shift().split(' ').map(Number));
    }

    for (const planet of planetary) {
      const [px, py, pr] = planet;
      const dist1 = (x1 - px)**2 + (y1 - py)**2;
      const dist2 = (x2 - px)**2 + (y2 - py)**2
      if (dist1 < pr**2 && dist2 < pr**2) {
        continue;
      }
      else if (dist1 < pr**2 || dist2 < pr**2) {
        cnt ++;
      }
    }
    answer.push(cnt);
  }

  answer.forEach((cnt) => {
    console.log(cnt);
  });
});
