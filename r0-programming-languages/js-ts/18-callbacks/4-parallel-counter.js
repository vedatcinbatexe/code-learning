const fs = require('fs');

['a.txt', 'b.txt', 'c.txt'].forEach((name, i) => {
    fs.writeFileSync(name, `content of file ${i}`);
});

let results = [];
let completed = 0;

function checkDone() {
  completed++;
  if (completed === 3) {
    console.log('All three loaded:', results);
    // cleanup
    ['a.txt', 'b.txt', 'c.txt'].forEach(name => fs.unlinkSync(name));
  }
}

fs.readFile('a.txt', 'utf8', (err, data) => {
  results.a = data;
  checkDone();
});

fs.readFile('b.txt', 'utf8', (err, data) => {
  results.b = data;
  checkDone();
});

fs.readFile('c.txt', 'utf8', (err, data) => {
  results.c = data;
  checkDone();
});

console.log('Kicked off 3 reads, none have finished yet');
