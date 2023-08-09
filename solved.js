"use strict";
// const arr = [-5, -4, -3, -2, 0, 2, 4, 6, 8];
// const arr = [-8, 3, 7, 8, -2, -10, 2, 10];
const arr = [-8, -5, -4, 2, 4, 5];

const zeroSumPair = function (arr) {
  let pair = [];
  let i = 0;
  let j = arr.length - 1;
  while (i < j) {
    const sum = arr[i] + arr[j];
    console.log(sum, i, j);
    if (sum === 0) {
      pair = [arr[i], arr[j]];
      return pair;
    }

    if (sum > 0) {
      j--;
    }

    if (sum < 0) {
      i++;
    }
  }

  return pair;
};

console.log(zeroSumPair(arr));
