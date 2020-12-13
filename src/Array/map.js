'use strict';

/*
const newArray = arr.map(function callback(currentValue[, index[, array]]) {
    // return new value 
}[, thisArg])
*/

const arr = [
  { id: 0, name: 'pikachu' },
  { id: 1, name: 'hitokage' },
  { id: 2, name: 'koratta' },
  { id: 3, name: 'pichu' },
  { id: 4, name: 'hitokage' },
];

const evolutions = new Map();
evolutions.set('pichu', 'pikachu');
evolutions.set('hitokage', 'lizard');
evolutions.set('koratta', 'ratta');

// 配列を加工して新しい配列として返す
// mapの各要素に対してreturnで何かしらの値を返す必要がある
console.log('========= map test 1 ===========');
const evoluted = arr.map((obj) => {
  if (evolutions.has(obj.name)) {
    return { ...obj, evoluted: evolutions.get(obj.name) };
  }
  return obj;
});
console.log('evolutions:', evoluted);

// 返さない場合はその要素は'undefined'となる
console.log('========= map test 2 ===========');
const evoluted2 = arr.map((obj) => {
  if (evolutions.has(obj.name)) {
    return { ...obj, evoluted: evolutions.get(obj.name) };
  }
});
console.log('evolutions:', evoluted2); // 要素0が`undefined`となる
