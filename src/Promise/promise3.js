'use strict';

// 参考：https://kde.hateblo.jp/entry/2018/11/01/042432

// 静的メソッド Promise.resolve() / Promise.reject()
// Promise.resolve(val) は new Promise((resolve) => resolve(val)) とほぼ同じ
// ただ、pending状態はなく即時にresolveされる
let promise = Promise.resolve('0: Resolved!!');
console.log(promise); // Promise { 0: Resolved!! }
promise = new Promise((resolve) => resolve('1: Resolved!!'));
console.log(promise); // Promise { 1: Resolved!! }

// Promise.resolve() はPromiseオブジェクトを返すメソッド
// 引数として渡す値によって返されるPromiseオブジェクトが変わる

// 1. Promiseオブジェクトを渡す => 渡されたPromiseオブジェクトをそのまま返す
promise = Promise.resolve(
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('0: Async Resolved!!');
    }, 2000);
  }),
);
// 引数にPromiseオブジェクト（resolve()まで2秒）渡しているのがそのまま返される
console.log('Promise.resolve():', promise); // <pending>

// 2. Thenableなオブジェクト -> Promise化して返してくれる
// thennableなオブジェクトとは？
// Promiseライクなオブジェクトで、`.then`というメソッドを持っているけど厳密なPromiseではないオブジェクト
// jQuery.ajax()などがこれにあたる（ajax()が返すのは`jqXHR Object`という少し古い定義）
// thennableなオブジェクトをPromiseに変換して返す
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const $ = require('jquery')(window);

// Promiseのthenやcatchなどが使えるようになる
const promiseSuccess = Promise.resolve($.ajax('https://httpbin.org/get'));
promiseSuccess.then((value) => console.log('promiseSuccess:', value.headers));
const promiseFail = Promise.resolve($.ajax('https://httpbin.org/status/500'));
promiseFail.catch((err) => console.log('promiseFail:', err.status));

// Promise.resolve()でラップしないと使えないのかと思ったけど、最近のjQueryのajax関数は
// Promiseに準拠しているらしく、ラップしないでも同じように使えた..
const ajaxSuccess = $.ajax('https://httpbin.org/get');
ajaxSuccess.then((value) => console.log('ajaxSuccess:', value.headers));
const ajaxFail = $.ajax('https://httpbin.org/status/500');
ajaxFail.catch((err) => console.log('ajaxFail:', err.status));

// 3. 上記以外の値（通常のオブジェクトやnullなど）
// 渡された値で`fulfilled`となった新たなPromiseオブジェクトを返す
// これはさっきの例と同じ
promise = Promise.resolve('2: Resolved!!');
console.log(promise); // 2: Resolved!!
