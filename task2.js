/**
 * @param {number} n - Assume n is always a valid integer; -10^9 < n < 10^9
 * @returns {(boolean|number)} - The last calculated number or false if not found
 */

function findLastNumber(n) {
  if (n === 0) return false;

  let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let i = 1;
  while (i <= 100) {
    const curr = `${i * n}`;
    digits = digits.filter(d => !curr.includes(d));
    if (digits.length === 0) return +curr;
    i++;
  }
  return false;
}



console.log(findLastNumber(12345));         // 49380
console.log(findLastNumber(0));             // false
console.log(findLastNumber(-123456789));    // -370370367