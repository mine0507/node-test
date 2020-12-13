'use strict';
/*
Array.filter(callback(element[, index, [array]])[, thisArg])
Array.map(callback(element[, index, [array]])[, thisArg])
Array.reduce(callback( accumulator, currentValue[, index[, array]] )[, initialValue]))
Array.forEach(callback(currentValue [, index [, array]])[, thisArg])
*/

// fsモジュールをrequire
const fs = require('fs');
// deep-diffモジュールのdiff関数をrequire
const diff = require('deep-diff').diff;

// JSONデータの読み込み
const testJson = require('./sample_data/sample.json');
const { waitForDebugger } = require('inspector');

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

console.log('========= reduce test 5 ===========');
// 配列からObjectを作ってみる
const newObj = parsed.reduce((prev, cur, index) => {
  prev[index] = cur._id;
  return prev;
}, {});
console.log(newObj);

/* forEach */
// testJsonのcompany名をすべて小文字にして出力してみる
// forEachは戻り値を返さない（mapは返す）
console.log('========= forEach test 1 ===========');
testJson.forEach((val) => {
  console.log(val.company.toLowerCase());
});

// forEachの中身には非同期関数は書けない
console.log('========= forEach test 2 ===========');
const readFileAsync = (fileName) => {
  return new Promise((resolve) => {
    fs.readFile(fileName, 'utf-8', (err, data) => {
      resolve(data);
    });
  });
};

console.log('== good case 1 ==');
(async () => {
  return await Promise.all(
    files.map(async (file) => {
      const data = await readFileAsync(file);
      resolve(JSON.parse(data));
    }),
  );
})();
console.log('done!');

console.log('== bad case ==');
const files = ['./sample_data/sample.json', './sample_data/sample2.json', './sample_data/sample3.json'];
files.forEach(async (file) => {
  const data = await readFileAsync(file);
  const parsedData = JSON.parse(data);
  console.log(parsedData[0].file);
});
console.log('done!');
/* 結果
done!
W24958.json
S43245.json
T1301541.json
*/
// done! が最初に表示されてしまうし、3つのファイルも読み込みが終了した順で表示されるので毎回順番は変わる
