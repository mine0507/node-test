'use strict';

/*
arr.forEach(callback(currentValue [, index [, array]])[, thisArg])
*/

const arr = [
  { id: 0, name: 'pikachu', type: 'electric', HP: 71 },
  { id: 1, name: 'hitokage', type: 'fire', HP: 82 },
  { id: 2, name: 'koratta', type: 'normal', HP: 62 },
  { id: 3, name: 'pichu', type: 'electric', HP: 55 },
  { id: 4, name: 'hitokage', type: 'fire', HP: 85 },
];

// nameをすべて大文字にして出力してみる
// forEachは戻り値を返さない（mapは返す）
console.log('========= forEach test 1 ===========');
arr.forEach((obj) => {
  console.log(obj.name.toUpperCase());
});

// forEachの中身には非同期関数は書けない
console.log('========= forEach test 2 ===========');
const fs = require('fs');

const readFileAsync = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (err, data) => {
      if (err) reject(new Error('Failed to read file.'));
      try {
        const parsed = JSON.parse(data);
        resolve(parsed);
      } catch (error) {
        reject(new Error('Failed to parse data.'));
      }
    });
  });
};

const files = ['./testData/sample1.json', './testData/sample2.json', './testData/sample3.json'];

console.log('== bad case ==');
files.forEach(async (file) => {
  const data = await readFileAsync(file).catch((err) => console.log(err.message));
  console.log('bad case: ', data[0].file);
});
console.log('bad case done!');
/* 結果
bad case done!
W24958.json
S43245.json
T1301541.json
*/
// done! が最初に表示されてしまうし、3つのファイルも読み込みが終了した順で表示されるので毎回順番は変わる

console.log('== good case ==');
(async () => {
  const allData = await Promise.all(
    files.map(async (file) => {
      const data = await readFileAsync(file).catch((err) => console.log(err.message));
      return data;
    }),
  );
  console.log(
    allData.forEach((data) => {
      console.log('good case: ', data[0].file);
    }),
  );
  console.log('good case done!');
})();
// forEachをmapに変更することによって、readFileAsync()関数のawaitが効く
// また、Promiseの配列がreturnされるので、Promise.all()で全てのProiseがresolveされるのを待つ
// Promise.all() を await するために全体をasyncの即時関数とする
