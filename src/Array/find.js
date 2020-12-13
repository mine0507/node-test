'use strict';

/*
const ret = arr.find(callback(element[, index[, array]])[, thisArg])
*/

const arr = [
  { id: 0, name: 'pikachu' },
  { id: 1, name: 'hitokage' },
  { id: 2, name: 'koratta' },
  { id: 3, name: 'pichu' },
  { id: 4, name: 'hitokage' },
];

// 対象の配列の中で、条件にマッチする"最初"の要素を返す（見つかった時点で処理終了）
console.log('========= find test 1 ===========');
const obj1 = arr.find((obj) => obj.name === 'hitokage');
console.log(obj1);

// 条件に一致しない場合は'undefined'を返す
console.log('========= find test 2 ===========');
const obj2 = arr.find((obj) => obj.name === 'hikozaru');
console.log(obj2);
