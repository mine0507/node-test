'use strict';

/*
const newArray = arr.filter(callback(element[, index, [array]])[, thisArg])
*/

const arr = [
  { id: 0, name: 'pikachu' },
  { id: 1, name: 'hitokage' },
  { id: 2, name: 'koratta' },
  { id: 3, name: 'pichu' },
  { id: 4, name: 'hitokage' },
];

// 条件がtrueとなった配列の要素をそのまま残す
// true になった要素を加工して新しく返すというのは出来ない
// そういう場合はいったんfilterしてからmapするか、reduceを使う
// 条件にマッチする行が１つなら`find()`、複数なら`filter()`を使うと良い
console.log('========= filter test 1 ===========');
const filtered1 = arr.filter((obj) => obj.name.match(/^pi.+/));
filtered1.forEach((obj) => console.log('filtered1:', obj));

// マッチしない場合は空の配列を返す
console.log('========= filter test 2 ===========');
const filtered2 = arr.filter((obj) => obj.name === 'messon');
console.log('filtered2:', filtered2);

// 第二引数にはオブジェクト指定出来て、filter関数内のthisとして使える
// ただしこの場合はアロー関数だと使えない
console.log('========= filter test 3 ===========');
const filtered3 = arr.filter(function (obj, index, array) {
  console.log(index); // 第２引数は配列のindex
  // console.log(array); // 第３引数はfilter元の配列
  return obj.name === this;
}, 'hitokage');
filtered3.forEach((obj) => console.log('filtered3:', obj));
