'use strict';

/*
cosnt ret = arr.reduce(callback( accumulator, currentValue[, index[, array]] )[, initialValue])
*/

const arr = [
  { id: 0, name: 'pikachu', type: 'electric', HP: 71 },
  { id: 1, name: 'hitokage', type: 'fire', HP: 82 },
  { id: 2, name: 'koratta', type: 'normal', HP: 62 },
  { id: 3, name: 'pichu', type: 'electric', HP: 55 },
  { id: 4, name: 'hitokage', type: 'fire', HP: 85 },
];

// 条件に一致した要素のみで新しい配列を作成する
console.log('========= reduce test 1 ===========');
const electricNames = arr.reduce((accumulator, curValue, index, originalArr) => {
  // console.log(`accumulator: ${JSON.stringify(accumulator)}`)
  // console.log(`curValue: ${curValue.company}`)
  // console.log(`index: ${index}`)
  // console.log(`originalArr: ${originalArr}`)
  if (curValue.type === 'electric') {
    accumulator.push(curValue.name);
  }

  return accumulator;
  // initialValueが指定されている場合、一番最初の関数実行時のaccumulatorにはinitialValueの値が入り、currentValueには配列の最初の値が入る。
  // initialValueが省略されている場合、一番最初の関数実行時のaccumulatorには配列の最初の値が入り、currentValueには配列の2番目の値が入る。
}, []);

console.log('electricNames:', electricNames);

// HPのの平均を出す
console.log('========= reduce test 2 ===========');
const averageHP = arr.reduce((accumulator, curValue, index) => {
  // console.log(accumulator)
  // console.log(curValue.age)
  // console.log(index)
  if (index + 1 === arr.length) {
    return (accumulator + curValue.HP) / arr.length;
  }

  return accumulator + curValue.HP;
}, 0);

console.log('averageHP:', averageHP);

// HPのの最大値を出す
console.log('========= reduce test 3 ===========');
const maxHP = arr.reduce((accumulator, curValue) => {
  return accumulator > curValue.HP ? accumulator : curValue.HP;
}, 0);

console.log('maxHP:', maxHP);

// reduce 関数で break したい
// HPの合計が一定数を超えたら処理を終了（break）
// 条件を満たした時点で以降の配列の要素を削除してしまえば良い
// ただし、splice() は元の配列を破壊するので元の配列をコピーしてからするべき
console.log('========= reduce test 4 ===========');
const diff = require('deep-diff').diff;
const copiedArr = [...arr];
const differences = diff(arr, copiedArr); // 差分がなければ undefined

console.log('differences:', differences);
console.log(`copiedArr.length: ${copiedArr.length}`);
const totalHP = copiedArr.reduce((accumulator, curValue, index, arr) => {
  if (accumulator > 200) {
    // Array.splice() は破壊的メソッド
    arr.splice(index);
  }
  return accumulator + curValue.HP;
}, 0);

console.log('totalHP:', totalHP);
console.log(`copiedArr.length: ${copiedArr.length}`);
console.log(`arr.length: ${arr.length}`); // 元々の配列には影響がない

console.log('========= reduce test 5 ===========');
// 配列からObjectを作ってみる
const newObj = arr.reduce((prev, cur, index) => {
  prev[`name${cur.id}`] = cur.name;
  return prev;
}, {});
console.log(newObj);
