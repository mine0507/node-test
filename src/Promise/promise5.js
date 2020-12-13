'use strict';

const fetch = require('node-fetch');

// Promiseの配列を回して作って逐次処理をする
// Promise.all()を使うとレスポンスの帰ってくる順番はバラバラになってしまう
//
// 参考：https://developers.google.com/web/fundamentals/primers/async-functions?hl=ja#%E4%BE%8B_%E3%83%95%E3%82%A7%E3%83%83%E3%83%81%E3%82%92%E9%A0%86%E7%95%AA%E3%81%AB%E5%87%BA%E5%8A%9B

const urls = ['https://yahoo.co.jp', 'https://google.co.jp', 'https://qiita.com'];

// Promise/reduceを使う場合
const logInOrder = (urls) => {
  const textPromises = urls.map((url) => {
    return fetch(url).then((response) => {
      return { url: url, status: response.status };
    });
  });

  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise).then((text) => console.log('1:', text));
  }, Promise.resolve());
};

// async/awaitを使う場合
// ループに for-ofを使う方法だと、同期的になる
// 一つのfetchが終わるまで次のfetchが始まらない => オーバーヘッドが生じる
async function logInOrderWait(urls) {
  for (const url of urls) {
    const response = await fetch(url); // ここが同期的
    console.log('2:', await { url: url, status: response.status });
  }
}

// 非同期にするにはmapを使う
// mapの引数に指定する関数をasync関数にすると、mapの中で呼ばれる処理が非同期になる
async function logInOrderBest(urls) {
  // fetch all the URLs in parallel
  const textPromises = urls.map(async (url) => {
    const response = await fetch(url); // ここは非同期
    return { url: url, status: response.status };
  });
  console.log('textPromises:', textPromises); // [ Promise { <pending> }, Promise { <pending> }, Promise { <pending> } ]

  // シーケンシャルに表示（ここは同期的）
  for (const textPromise of textPromises) {
    console.log('3:', await textPromise);
  }
}

// 補足：forEachは非同期で実行されるので、awaitをしていても実際にはresponseが返ってきた順番で表示されてしまう
// 参考：https://qiita.com/_takeshi_24/items/1403727efb3fd86f0bcd#foreach%E3%81%A7asyncawait
const logNotInOrder = (urls) => {
  urls.forEach(async (url) => {
    const response = await fetch(url);
    console.log('4:', { url: url, status: response.status });
  });
  console.log('logNotInOrder: done!!');
};

logInOrder(urls);
logInOrderWait(urls);
logInOrderBest(urls);
logNotInOrder(urls);

// async関数にするとawaitが使える代わりに必ずPromiseを返す関数になるというところです。
// 関数内部では順番は保たれますが、関数使用側ではasync関数から返ってきたPromiseを制御するのを忘れないようにしましょう。

// async関数でsleepを実装する
// https://www.sejuku.net/blog/24629
