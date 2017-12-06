let spiral = {};

function pointKey(x, y) {
	return `point_${x}_${y}`;
}

function getValueAtPosition(x, y) {
	return spiral[pointKey(x, y)];
}

function updateValueAtPosition(x, y) {
	let current = getValueAtPosition(x, y);
  if (current !== undefined) {
  	return current;
  }
	let value = 0;
  value += spiral[pointKey((x + 1), y)] || 0;
  value += spiral[pointKey((x + 1), (y + 1))] || 0;
  value += spiral[pointKey((x + 1), (y - 1))] || 0;
  value += spiral[pointKey(x, (y + 1))] || 0;
  value += spiral[pointKey(x, (y - 1))] || 0;
  value += spiral[pointKey((x - 1), (y + 1))] || 0;
  value += spiral[pointKey((x - 1), y)] || 0;
  value += spiral[pointKey((x - 1), (y - 1))] || 0;
	spiral[pointKey(x, y)] = value;
  return value;
}

function outputSpiral() {
  console.log('--------------------');
	Object.keys(spiral).forEach((key) => {
		console.log(`${key}: ${spiral[key]}`);
	});
}

function testPosition(x, y, test) {
	let next = updateValueAtPosition(x, y);
  return next > test;
}

function testNextSpiral(x, y, test) {
	let size = Math.abs(y) + 1;
	// move one square to right
  x += 1;
  if (testPosition(x, y, test)) {
  	return getValueAtPosition(x, y);
  }
  // increment y by the size of the square
  for (y; y < size; y++) {
    if (testPosition(x, y, test)) {
      return getValueAtPosition(x, y);
    }
  }
  // at top-right corner
  for (x; x > -size; x--) {
    if (testPosition(x, y, test)) {
      return getValueAtPosition(x, y);
    }
  }
  // at top-left corner
  for (y; y > -size; y--) {
    if (testPosition(x, y, test)) {
      return getValueAtPosition(x, y);
    }
  }
  // at bottom-left corner
  for (x; x < size; x++) {
    if (testPosition(x, y, test)) {
      return getValueAtPosition(x, y);
    }
  }
  // test final position
  if (testPosition(x, y, test)) {
  	return getValueAtPosition(x, y);
  }
  return [x, y];
}

function testInitialSpiral(test) {
	// set up the first few values to get out of the first round of the spiral
  let x = 0;
  let y = 0;
  spiral[pointKey(x, y)] = 1;
  let initialSpiral = [
  	[1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1]
  ];
  for (let i = 0; i < initialSpiral.length; i++) {
  	[x, y] = initialSpiral[i];
  	if (testPosition(x, y, test)) {
    	return getValueAtPosition(x, y);
    }
  }
  return [x, y];
}

function calculateNextHigherValue(test) {
	let initialTest = testInitialSpiral(test);
  if (!Array.isArray(initialTest)) {
  	return initialTest;
  }
  // start going around the spiral
  let result = testNextSpiral(...initialTest, test);
  let rails = 0;
  let found = false;
  while (rails < 10 && !false) {
    rails++;
    if (!Array.isArray(result)) {
    	found = true;
    } else {
    	result = testNextSpiral(...result, test);
    }
  };
  return result;
}

console.log('next highest: ' + calculateNextHigherValue(312051));
