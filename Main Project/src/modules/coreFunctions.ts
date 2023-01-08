import { fixingWeirdCombinations } from './fixingWeirdCombinations';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { syllable } = require('stress-pt');

// Global variables for verification code

// Variables for generating names
const groupGeneratedNames: string[] = [];
let syllablesQty: number;

export const vowelsList = 'aeiou';

export function generateName(nameLength: number, updatedConsonantList: string) {
  let generatedName = '';
  const createName1stStep: string[] = [];
  for (let i = 0; i < nameLength; i++) {
    createName1stStep[i] = 'x';
  } // creating array with the desired length
  createName1stStep.splice(0, 1, 'M'); // replacing the first letter with 'M'
  createName1stStep.splice(1, 1, 'a'); // replacing the first letter with 'a'

  // adding the defined syllable 'di'
  const createName2ndStep = createName1stStep;
  const syllablePosition = getRandomNumber(2, nameLength - 2);
  createName2ndStep.splice(syllablePosition, 1, 'd');
  createName2ndStep.splice(syllablePosition + 1, 1, 'i');

  // Now we need to know what are the positions that we can insert new letters
  // we can use 'x' inserted before to get those!
  const positionsLeft: number[] = [];
  let i = 0;

  createName2ndStep.forEach((element, position) => {
    if (createName2ndStep[position] === 'x') {
      positionsLeft[i] = position;
      i++;
    }
  });

  // now let's work with those positions. We know that we need at least 2 more syllables and 2 vowels

  // So let's insert them in one of the positions
  const createName3rdStep = createName2ndStep;

  // this will get a bit messy but we are basically taking a random position from the word
  // (considering those that are free), and replacing them with two random vowels.
  // We will take care of the sillables later..
  let randomLeftPosition = getRandomNumber(0, positionsLeft.length - 1);

  let updatePosition: number = positionsLeft[randomLeftPosition];
  positionsLeft.splice(randomLeftPosition, 1);

  createName3rdStep[updatePosition] =
    vowelsList[getRandomNumber(0, vowelsList.length - 1)];
  randomLeftPosition = getRandomNumber(0, positionsLeft.length - 1);
  updatePosition = positionsLeft[randomLeftPosition];
  positionsLeft.splice(randomLeftPosition, 1);
  createName3rdStep[updatePosition] =
    vowelsList[getRandomNumber(0, vowelsList.length - 1)];

  // Now we will add the consonants on the remaining positions
  const createName4thStep = createName3rdStep;
  positionsLeft.forEach((element) => {
    createName4thStep[element] =
      updatedConsonantList[getRandomNumber(1, updatedConsonantList.length - 1)];
  });

  // Converting the array to one string (word)
  for (const _letter of createName4thStep) {
    generatedName += _letter;
  }
  return generatedName;
}

function getRandomNumber(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateGroupNames(
  generatedNamesQty: number,
  nameLength: number,
  updatedConsonantList: string
) {
  for (let z = 0; z < generatedNamesQty; z++) {
    groupGeneratedNames[z] = generateName(nameLength, updatedConsonantList);

    // Counting the amount of syllables
    syllablesQty = syllable(groupGeneratedNames[z]).split('|').length;
    let securityFlag = 0;
    while (syllablesQty !== 4 || securityFlag <= 1000) {
      groupGeneratedNames[z] = generateName(nameLength, updatedConsonantList);
      groupGeneratedNames[z] = fixingWeirdCombinations(
        groupGeneratedNames[z],
        nameLength,
        updatedConsonantList
      );
      syllablesQty = syllable(groupGeneratedNames[z]).split('|').length;
      securityFlag++;
    }
  }
  return groupGeneratedNames;
}
