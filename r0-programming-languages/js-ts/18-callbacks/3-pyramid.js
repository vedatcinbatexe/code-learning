const fs = require('fs');

fs.writeFile('demo.txt', 'hello', (err) => {
  if (err) return console.error(err);
  console.log('1: wrote file');

  fs.readFile('demo.txt', 'utf8', (err, data) => {
    if (err) return console.error(err);
    console.log('2: read back:', data);

    fs.appendFile('demo.txt', ' world', (err) => {
      if (err) return console.error(err);
      console.log('3: appended');

      fs.readFile('demo.txt', 'utf8', (err, data) => {
        if (err) return console.error(err);
        console.log('4: final contents:', data);

        fs.unlink('demo.txt', (err) => {
          if (err) return console.error(err);
          console.log('5: cleaned up');
        });
      });
    });
  });
});

console.log('0: this runs first, synchronously');