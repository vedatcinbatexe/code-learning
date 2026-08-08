const fs = require('fs');

fs.readFile(__filename, 'utf8', (err, data) => {
    if(err) {
        console.error('Failed: ', err.message);
        return;
    }
    console.log('File contents length: ', data.length);
});

console.log('This logs BEFORE the file contents')