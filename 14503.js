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
  const [r, c, d] = input[idx++].split(' ').map(Number);
  const room = [];
  for (let i = 0; i < n; i++) room.push(input[idx++].split(' ').map(Number));

  const direction = {
    0: [-1, 0],
    1: [0, 1],
    2: [1, 0],
    3: [0, -1]
  }

  let [cur_r, cur_c, cur_d] = [r, c, d];
  let cnt = 0;
  while(true) {
    if (room[cur_r][cur_c] === 0) { //현재 칸이 아직 청소되지 않은 경우
      room[cur_r][cur_c] = 2; //현재 칸을 청소한다.
      cnt ++;
    }

    let flag = 0;
    for (let i = 1; i <= 4; i++) {
      const next_d = (cur_d + 3 * i) % 4; //반시계 방향으로 90도 회전
      const [dy, dx] = direction[next_d]; //바라보는 방향을 기준으로 앞쪽 칸
      if (cur_r + dy > 0 && cur_r + dy < n && cur_c + dx > 0 && cur_c + dx < m && room[cur_r + dy][cur_c + dx] === 0) { //현재 칸의 주변 4칸 중 청소되지 않은 빈 칸이 있는 경우
        [cur_r, cur_c, cur_d] = [cur_r + dy, cur_c + dx, next_d]; //한 칸 전진한다.
        flag = 1;
        break;
      }
    }

    if (!flag) { //현재 칸의 주변 4칸 중 청소되지 않은 빈 칸이 없는 경우
      const back_d = (cur_d + 2) % 4;
      const [dy, dx] = direction[back_d];
      if (cur_r + dy > 0 && cur_r + dy < n && cur_c + dx > 0 && cur_c + dx < m && room[cur_r + dy][cur_c + dx] != 1) { //한 칸 후진할 수 있다면
        [cur_r, cur_c] = [cur_r + dy, cur_c + dx]; //한 칸 후진하고
      } else { //후진할 수 없다면
        break; //작동을 멈춘다.
      }
    }
  }

  console.log(cnt);
});