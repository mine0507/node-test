'use strict';

// 引用：https://azu.github.io/promises-book/

// Promise オブジェクトとは
let promise = new Promise(function (resolve, reject) {});
console.log(promise); // 初期状態なので Promise { <pending> }
// `new Promise`へ渡される関数のことをexecutorと呼ぶ
// executor関数は、reslove関数とreject関数を引数に取る
// promiseの作成時にexecutor関数は自動で呼ばれ、即時実行される

// Promise オブジェクトは、内部的に`state`と`result`の二つのプロパティを持つ
// それぞれの初期値は state: "pending", result: undefined である
// resolve(value)関数が実行された時、state: "fulfilled", result: value となる
// reject(error)関数が実行された時、state: "rejected", result: error となる
// reject(error)時に渡すerrorは何でも良いが、通常は`new Error()` でErrorオブジェクトとするのが推奨
// executor関数の中では通常何か非同期の処理が行われ、
// その後Promiseオブジェクトの状態（state）を変更するためにresove(value) or reject(error)が呼ばれる

// Promise オブジェクトの状態推移まとめ
// | 状態（state）	| 条件 | 条件成立時の挙動 |
// |----|----|----|
// | pending (初期状態)|	作成時 |	待機 |
// | fulfilled (解決済み)| resolve()の実行 | onFulfilledを呼ぶ |
// | rejected (拒否済み)| reject()の実行 | onRejectedを呼ぶ |
// \* 一度状態がfulfilledまたはrejectedに変化するともう変わることはない
//  => onFulfilled, onRejected は一度しか呼ばれない

// Promiseオブジェクトは、then/catch/finallyというメソッドを持つ
// 生成されたPromiseオブジェクトは、いつresolve/rejectされるかわからない
// 上記（onFulfilled/onRejected）を検知出来るのが、then, catch, finallyの３つのメソッドとなる

// 非同期な処理をしなければthen/catch/finallyは不要
promise = new Promise((resolve) => {
  resolve('0: resolved!!'); // このexecutor関数では特に非同期な事はしていないので、resolve()は同期的に即時実行されている
});
console.log(promise); // 0: resolved!!

// thenを使う
promise = new Promise((resolve) => {
  setTimeout(() => resolve('resolved!!'), 2000);
});
console.log(promise.then((val) => console.log(`1: ${val}`))); // <pending> => まだresoveされていないのでpending
// resolve済 (fulfilled)の状態になったらresolve時のvalueが表示される
promise.then((val) => console.log(`1: ${val}`)); // 1: resolved!! (thenでpromiseがresolveになるのを待っているので2秒かかる)
promise.then((val) => console.log(`2: ${val}`)); // 2: resolved!! // ここからは既にresolve済みなので即実行される
promise.then((val) => console.log(`3: ${val}`)); // 3: resolved!!

// catchを使う
promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('1: error!!')), 3000);
});
// .catch(f)は、.then(f, f) を単に簡略化したもの
promise.catch((err) => {
  console.log(err.message); // 1: error!!
});

// catchしない場合は`UnhandledPromiseRejectionWarning`となるので注意
//promise = new Promise((resolve, reject) => {
//  reject(new Error('0: UnhandledPromiseRejectionWarning!!')); // UnhandledPromiseRejectionWarning
//});
