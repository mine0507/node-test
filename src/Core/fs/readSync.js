'use strict';

const fs = require('fs');

// Buffer
const buf = fs.readFileSync('./data/test.json');
console.log(buf); // Buffer object
console.log(`buf to string: ${buf.toString()}`); // string

// String
let strData = fs.readFileSync('./data/test.json', 'utf8');
console.log(`data: ${strData}`);

// Option setting { encoding, flag }
// flags: https://nodejs.org/api/fs.html#fs_file_system_flags
strData = fs.readFileSync('./data/test.json', { encoding: 'utf-8', flag: 'r' });
console.log(`data: ${strData}`);

// Error Handling
try {
  const somefile = fs.readFileSync('somefile', 'utf-8');
  console.log(somefile);
} catch (error) {
  console.log(error.message);
}
