'use strict';

// Promise.resolve()とPromiseチェーンでのthen()
// then() ≒ 非同期のPromise.resolve()
// then() に渡された関数が return した値をPromise.resolve() に渡して新しいPromiseオブジェクトを生成する
// => Promise.resolve(returnされた値)
const promise = Promise.resolve('1: PromiseThen');
const promiseThen = promise.then((val) => val);
console.log(promise); // '1: PromiseThen'
console.log(promiseThen); // '<pending>'

setTimeout(() => {
  console.log(promise); // '1: PromiseThen'
  console.log(promiseThen); // '1: PromiseThen'
  console.log(promise === promiseThen); // 値は同じだけど、別オブジェクトなのでfalse
}, 100);

// もう少し具体的にみる
// 下記の例では、`return res.json()` の部分が`fetch`の仕様でPromiseオブジェクトを返すようになっている
// なので最終的にはthen() に渡される無名関数は Promise.resolve(res.json()) となっている
const fetch = require('node-fetch');
fetch('https://holidays-jp.github.io/api/v1/date.json')
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((json) => {
    console.log(Object.values(json)[0]); // "元日"
  });
