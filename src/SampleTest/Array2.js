'use strict';
/*
Array.every
Array.slice
Array.indexOf
Array.some
// ec7
Array.includes

// 破壊的メソッド
Array.splice
Array.sort
Array.reverse
Array.join
Array.fill


// スプレッド構文
https://qiita.com/Nossa/items/e6f503cbb95c8e6967f8

*/

// fsモジュールをrequire
const fs = require('fs');
// deep-diffモジュールのdiff関数をrequire
const diff = require('deep-diff').diff;

// JSONデータの読み込み
const testJson = require('./sample_data/sample.json');

// テストデータを読みこむ（オブジェクトの配列）
// エンコードを指定してるので戻り値の型はstringである事に注意
// エンコードを指定しない場合はbufferとなる
const testData = fs.readFileSync('./sample_data/complidate.data', 'utf-8');

// JSON文字列なので、parseが必要
let parsed = null;
try {
  parsed = JSON.parse(testData);
} catch (error) {
  console.log(error.message);
}

/* filter */
// 配列の中で isActive == true なものだけ抜きだして、新しい配列を返す
// マッチしない場合は空の配列を返す
console.log('========= filter test 1 ===========');
const filterd = parsed.filter((obj) => obj.isActive);
filterd.forEach((obj) => console.log(`filterd true: ${obj.isActive}`));
// filterは条件がtrueとなった配列の要素をそのまま残す
// true になった要素を加工して新しく返すというのは出来ない
// そういう場合はいったんfilterしてからmapするか、reduceを使う

// 第二引数にはオブジェクト指定出来て、filter関数内のthisとして使える
// ただしこの場合はアロー関数だと使えない
console.log('========= filter test 2 ===========');
const filterd2 = parsed.filter(function (obj, index, array) {
  // console.log(index);
  // console.log(array);
  return obj.eyeColor === this;
}, 'brown');
filterd2.forEach((obj) => console.log(`filterd2: ${obj.eyeColor}`));

/* map */
// 配列の中から特定のkey:valueだけ抜き出したい
// mapは現在の配列を加工して新しい配列を返す
console.log('========= map test ===========');
const mapped = parsed.map((obj) => {
  return { guid: obj.guid, name: obj.name, age: obj.age };
});

mapped.forEach((obj) => console.log(`mapped: ${JSON.stringify(obj)}`));

/* reduce - 超優秀関数 */
// testJsonのcompanyと合致する配列を新たに作る
console.log('========= reduce test 1 ===========');
const reducedArr = parsed.reduce((accumulator, curValue, index, originalArr) => {
  // console.log(`accumulator: ${JSON.stringify(accumulator)}`)
  // console.log(`curValue: ${curValue.company}`)
  // console.log(`index: ${index}`)
  // console.log(`originalArr: ${originalArr}`)
  const filterd = testJson.filter((obj) => obj.company === curValue.company);

  if (filterd.length) {
    accumulator.push(filterd);
  }

  return accumulator;

  // initialValueが指定されている場合、一番最初の関数実行時のaccumulatorにはinitialValueの値が入り、currentValueには配列の最初の値が入る。
  // initialValueが省略されている場合、一番最初の関数実行時のaccumulatorには配列の最初の値が入り、currentValueには配列の2番目の値が入る。
}, []);

console.log('reducedArr:', reducedArr);

// testDataの age の平均を出す
console.log('========= reduce test 2 ===========');
const averageAge = parsed.reduce((accumulator, curValue, index) => {
  // console.log(accumulator)
  // console.log(curValue.age)
  // console.log(index)
  if (index + 1 === parsed.length) {
    return (accumulator + curValue.age) / parsed.length;
  }

  return accumulator + curValue.age;
}, 0);

console.log('averageAge:', averageAge);

// testDataの age の最大値を出す
console.log('========= reduce test 3 ===========');
const maxAge = parsed.reduce((accumulator, curValue) => {
  return accumulator > curValue.age ? accumulator : curValue.age;
}, 0);

console.log('maxAge:', maxAge);

// reduce 関数で break したい
// 残高（balance）が一定数を超えたら処理を終了（break）
// 条件を満たした時点で以降の配列の要素を削除してしまえば良い
// ただし、splice() は元の配列を破壊するので元の配列をコピーしてからするべき
console.log('========= reduce test 4 ===========');
const copiedParsed = [...parsed];
const differences = diff(parsed, copiedParsed); // 差分がなければ undefined

console.log('differences:', differences);
console.log(`copiedParsed.length: ${copiedParsed.length}`);
const balance = copiedParsed.reduce((accumulator, curValue, index, arr) => {
  const num = Number(curValue.balance.replace(/\$|,/g, ''));
  // console.log(`num: ${num}`)
  // console.log(`accumulator: ${accumulator}`)

  if (accumulator > 10000) {
    // Array.splice() は破壊的メソッド
    arr.splice(index);
  }
  return accumulator + num;
}, 0);

console.log('balance:', balance);
console.log(`copiedParsed.length: ${copiedParsed.length}`);
console.log(`parsed.length: ${parsed.length}`);
