function getNextLargestSquare(input) {
	let sqrt = Math.ceil(Math.sqrt(input))
  return sqrt * sqrt;
}

function getNextLargestOddSquare(input) {
	let next = getNextLargestSquare(input);
  if (next % 2 === 1) {
  	return next;
  }
  return getNextLargestSquare(next + 1);
}

function findPosition(input) {
	let bottomCorner = getNextLargestOddSquare(input);
  let sideLength = Math.sqrt(bottomCorner);
  let distance = bottomCorner - input; // how many spaces away
  let spaceSide = Math.floor(distance / sideLength);
  let bottomCornerX = ((sideLength - 1)/2);
  let bottomCornerY = -(bottomCornerX);
  let distanceFromClosestCorner = distance % (sideLength - 1);
  let x, y;
  switch (spaceSide) {
  	case 0: {
    	// on bottom row
      y = bottomCornerY;
      x = bottomCornerX - distanceFromClosestCorner;
      break;
    }
    case 1: {
    	// on left side
      x = -bottomCornerX;
      y = bottomCornerY + distanceFromClosestCorner;
      break;
    }
    case 2: {
    	// on top row
      y = -bottomCornerY;
      x = bottomCornerX - distanceFromClosestCorner;
      break;
    }
    case 3: {
      // on right side
      x = bottomCornerX;
      y = bottomCornerY + distanceFromClosestCorner;
      break;
    }
  }
  return [x, y];
}

function calculateSteps(input) {
	let [x, y] = findPosition(input);
  return Math.abs(x) + Math.abs(y);
}

let input = 312051;
console.log(calculateSteps(input));
