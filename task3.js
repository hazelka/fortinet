/**
 * @param {number} apple - Number of apples given; apple >= 0
 * @param {number} banana - Number of banana given; banana >= 0
 * @returns {number} - The largest number of monkeys can be fed
 */

function maxMonkeysCanBeFed(apple, banana) {
  if (apple === 0 && banana === 0) return 0;

  let n = 1;
  let max = 0;
  while (apple >= n || banana >= n || apple + banana >= n) {
    let a = n;
    let b = 0;
    while (a >= 0) {
      if (apple >= a && banana >= b) {
        apple -= a;
        banana -= b;
        max++;
      }
      a--;
      b++;
    }
    n++;
  }
  return max;
}



console.log(maxMonkeysCanBeFed(0, 0));    // 0
console.log(maxMonkeysCanBeFed(1, 1));    // 2
console.log(maxMonkeysCanBeFed(2, 2));    // 3
console.log(maxMonkeysCanBeFed(4, 5));    // 5
console.log(maxMonkeysCanBeFed(3, 3));    // 4
console.log(maxMonkeysCanBeFed(10, 10));  // 9
console.log(maxMonkeysCanBeFed(0, 10));   // 4

