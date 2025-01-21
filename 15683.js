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
  const office = [];
  for (let i = 0; i < n; i++) office.push(input[idx++].split(' ').map(Number));

  const direction = {
    0: [-1, 0],
    1: [0, 1],
    2: [1, 0],
    3: [0, -1]
  }

  const cctv = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (office[i][j] > 0 && office[i][j] < 6) cctv.push([i, j, office[i][j]]);
    }
  }

  let answer = n * m;
  setDirection(office, 0);

  console.log(answer);
  
  //cctv별 방향 정하기 (모든 경우의 수)
  function setDirection(curOffice, depth) {
    if (depth === cctv.length) { //모든 cctv의 방향이 정해졌다면 사각지대의 개수를 센다.
      let cnt = 0;

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (curOffice[i][j] === 0) cnt++;
        }
      }
      
      answer = Math.min(answer, cnt);
      return;
    }

    const cctvType = cctv[depth][2];
    let dir;

    switch (cctvType) { //cctv 번호에 따라 달라지는 경우의 수를 정한다.
      case 1:
      case 3:
      case 4:
        dir = 4;
        break;
      case 2:
        dir = 2;
        break;
      case 5:
        dir = 1;
        break;
    }

    for (let d = 0; d < dir; d++) { //cctv 방향에 따른 감시 상태를 업데이트하여 다음 루프로 넘긴다.
      nextOffice = checkBlindSpot(curOffice, cctv[depth][0], cctv[depth][1], cctv[depth][2], d);
      setDirection(nextOffice, depth + 1);
    }
  }

  //cctv 타입에 따라 감시할 방향을 watch 함수로 전달한다.
  function checkBlindSpot(curOffice, y, x, type, d) {
    let officeStatus = JSON.parse(JSON.stringify(curOffice));

    switch(type) {
      case 1:
        officeStatus = watch(officeStatus, y, x, d);
        break;
      case 2:
        officeStatus = watch(officeStatus, y, x, d);
        officeStatus = watch(officeStatus, y, x, d + 2);
        break;
      case 3:
        officeStatus = watch(officeStatus, y, x, d);
        officeStatus = watch(officeStatus, y, x, (d + 1) % 4);
        break;
      case 4:
        officeStatus = watch(officeStatus, y, x, d);
        officeStatus = watch(officeStatus, y, x, (d + 1) % 4);
        officeStatus = watch(officeStatus, y, x, (d + 2) % 4);
        break;
      case 5:
        officeStatus = watch(officeStatus, y, x, 0);
        officeStatus = watch(officeStatus, y, x, 1);
        officeStatus = watch(officeStatus, y, x, 2);
        officeStatus = watch(officeStatus, y, x, 3);
        break;
    }
    return officeStatus;
  }

  //cctv의 위치와 방향 정보에 따라 사무실 감시 상태 배열을 수정한다.
  function watch(curOffice, y, x, d) {
    const [dy, dx] = direction[d];

    while(true) {
      y += dy;
      x += dx;

      if (x >= 0 && y >= 0 && x < m && y < n) {
        if (curOffice[y][x] === 0) {
          curOffice[y][x] = '#';
        } else if (curOffice[y][x] === 6) {
          return curOffice;
        }
      } else {
        return curOffice;
      }
    }
  }
});