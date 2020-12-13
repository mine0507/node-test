'use strict';

const fs = require('fs');
const encoding = require('encoding-japanese');
const writeData = 'テストデータ\n';

// Write file with utf-8
fs.writeFileSync('./data/tmp.txt', writeData, { encoding: 'utf-8' });
let data = fs.readFileSync('./data/tmp.txt');
console.log(`data: ${data}`);
console.log(`data-encoding: ${encoding.detect(data)}`); //UTF8

// Append file with utf-8
fs.appendFileSync('./data/tmp.txt', writeData, { encoding: 'utf-8' });
data = fs.readFileSync('./data/tmp.txt');
console.log(`data: ${data}`); // appending

// Delete file
fs.unlinkSync('./data/tmp.txt');
