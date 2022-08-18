/**
 * @param {number} apple - Number of apples given; apple >= 0
 * @param {number} banana - Number of banana given; banana >= 0
 * @returns {number} - The largest number of monkeys can be fed
 */

function maxMonkeysCanBeFed(apple, banana) {
  if (apple === 0 && banana === 0) return 0;

  const aFirst = apple > banana;
  let n = 1;
  let a;
  let b;
  let max = 0;

  while (apple + banana >= n) {
    a = aFirst ? n : 0;
    b = aFirst ? 0 : n;
    while (a >= 0 && b >= 0) {
      if (apple >= a && banana >= b) {
        apple -= a;
        banana -= b;
        max++;
      }
      generateNextAB();
    }
    n++;
  }

  return max;

  // If apple < banana, iteration will be bbb->bba->baa->aaa
  // If apple >= banana, iteration will be aaa->aab->abb->bbb
  function generateNextAB() {
    if (aFirst) {
      a--;
      b++;
    } else {
      a++;
      b--;
    }
  }
}



console.log(maxMonkeysCanBeFed(0, 0));    // 0
console.log(maxMonkeysCanBeFed(1, 1));    // 2
console.log(maxMonkeysCanBeFed(2, 2));    // 3
console.log(maxMonkeysCanBeFed(4, 5));    // 5
console.log(maxMonkeysCanBeFed(3, 3));    // 4
console.log(maxMonkeysCanBeFed(10, 10));  // 9
console.log(maxMonkeysCanBeFed(0, 10));   // 4
console.log(maxMonkeysCanBeFed(6, 16));   // 9
console.log(maxMonkeysCanBeFed(16, 6));   // 9
