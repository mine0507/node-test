'use strict';

// Promiseを返すFunctionを作る
// 基本的にはPromiseオブジェクトをreturnするようにすればOK
const asyncFunction = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('This is Async Function!');
    }, 1000);
  });
};
asyncFunction().then((value) => console.log(value)); // => 'This is Async Function!'

// 非同期処理を順番に実行する
// thenでつなげる
const asyncFuncA = (val, time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(val);
      resolve(val);
    }, time);
  });
};
asyncFuncA('asyncTEST1:done:0', 2000)
  .then((val) => asyncFuncA(val + '1', 2000))
  .then((val) => asyncFuncA(val + '2', 2000))
  .then((val) => asyncFuncA(val + '3', 2000))
  .then((val) => asyncFuncA(val + '4', 2000));

// thenの中でPromiseをreturnしないと待ってくれない
asyncFuncA('asyncTEST2:done:0', 15000)
  .then((val) => asyncFuncA(val + '1', 2000))
  .then((val) => {
    console.log('no return!!');
    asyncFuncA(val + '2', 5000); // これはPromiseをreturnしていないので、すぐに次の処理に行ってしまう
    // return asyncFuncA(val + '2', 5000); // これだとうまく逐次実行される
  })
  .then((val) => asyncFuncA(val + '3', 1000))
  .then((val) => asyncFuncA(val + '4', 1000));
