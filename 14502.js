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
  const lab = [];
  for (let i = 0; i < n; i++) lab.push(input[idx++].split(' ').map(Number));

  const space = [];
  const virus = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (lab[i][j] === 0) space.push([i, j]);
      else if (lab[i][j] === 2) virus.push([i, j]);
    }
  }
  
  let safe_zone_max = 0;
  for (let f = 0; f < space.length - 2; f++) {
    const [f_i, f_j] = space[f];
    lab[f_i][f_j] = 1;
    for (let s = f + 1; s < space.length - 1; s++) {
      const [s_i, s_j] = space[s];
      lab[s_i][s_j] = 1;
      for (let t = s + 1; t < space.length; t++) {
        const [t_i, t_j] = space[t];
        lab[t_i][t_j] = 1;
        const safe_zone = spread(lab, virus);
        safe_zone_max = Math.max(safe_zone_max, safe_zone);
        lab[t_i][t_j] = 0;
      }
      lab[s_i][s_j] = 0;
    }
    lab[f_i][f_j] = 0;
  }

  function spread(lab, virus) {
    const lab_copy = JSON.parse(JSON.stringify(lab));
    const virus_copy = JSON.parse(JSON.stringify(virus));

    while (virus_copy.length > 0) {
      const [cur_i, cur_j] = virus_copy.pop();
      if (cur_i-1 >= 0 && lab_copy[cur_i-1][cur_j] === 0) {
        lab_copy[cur_i-1][cur_j] = 2;
        virus_copy.push([cur_i-1, cur_j]);
      }
      if (cur_i+1 < n && lab_copy[cur_i+1][cur_j] === 0) {
        lab_copy[cur_i+1][cur_j] = 2;
        virus_copy.push([cur_i+1, cur_j]);
      }
      if (cur_j-1 >= 0 && lab_copy[cur_i][cur_j-1] === 0) {
        lab_copy[cur_i][cur_j-1] = 2;
        virus_copy.push([cur_i, cur_j-1]);
      }
      if (cur_j+1 < m && lab_copy[cur_i][cur_j+1] === 0) {
        lab_copy[cur_i][cur_j+1] = 2;
        virus_copy.push([cur_i, cur_j+1]);
      }
    }

    let safe_zone = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (lab_copy[i][j] == 0) safe_zone ++;
      }
    }

    return safe_zone;
  }

  console.log(safe_zone_max);
});