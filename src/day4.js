function isSimpleValidPassphrase(test) {
	let passphraseWords = test.split(/\s+/);
  let passphraseUnique = new Set(passphraseWords);
	return passphraseWords.length === passphraseUnique.size;
}

function isEnhancedValidPassphrase(test) {
	let simpleValid = isSimpleValidPassphrase(test);
  if (!simpleValid) {
  	return false;
  }
  // test for anagrams
  let words = test.split(/\s+/);
  let sorted = words.map((word) => {
  	return word.split('').sort().join('');
  });
  // If there are no anagrams then this should still be a unique set of passphrases
  return isSimpleValidPassphrase(sorted.join(' '));
}

function countValidPassphrases(input, callback) {
  let tests = input.split(/\n/);
  let valid = tests.filter(callback);
  return valid.length;
}

function countSimpleValidPassphrases(input, isSimpleValidPassphrase) {
	return countValidPassphrases(input, isSimpleValidPassphrase);
}

function countEnhancedValidPassphrases(input) {
	return countValidPassphrases(input, isEnhancedValidPassphrase);
}


let input = `abcde fghij
abcde xyz ecdab
a ab abc abd abf abj
iiii oiii ooii oooi oooo
oiii ioii iioi iiio`;

console.log(countEnhancedValidPassphrases(input));
