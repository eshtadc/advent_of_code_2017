// http://adventofcode.com/2017/day/1
function calculateCaptcha(input) {
	let sum = 0;
  let inputStr = input.toString();
  console.log(inputStr);
  for (let i = 0; i < inputStr.length; i++) {
    let nextIndex = i === inputStr.length - 1 ? 0 : i + 1;
    if (inputStr[i] === inputStr[nextIndex]) {
      sum += parseInt(inputStr[i]);
    }
  }
  return sum;
}
console.log(calculateCaptcha(9121219));
