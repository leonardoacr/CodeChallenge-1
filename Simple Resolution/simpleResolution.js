// - Starts with “ma”
// - Contains 4 vowels
// - Has 4 syllabes
// - One of the syllabes is “di”

const { syllable, stressed, wordStressed } = require('stress-pt');

// index for arrays
let i = 0;

// Variables for generating names
let groupGeneratedNames = [];
let syllablesQty;

// const namesVerifiedIBGE = ['Mamedio', 'Madiana', 'Madilene', 'Marilandi', 'Marindia'];

const vowelsList = 'aeiou';
// const consonantsList = 'bcdfghjklmnpqrstwvxyz'; // custom consonants to reduce errors
const consonantsList = 'bdlmn';

function generateName(nameLength) {
    let generatedName = '';
    let createName1stStep = [];
    for (i = 0; i < nameLength; i++) { createName1stStep[i] = 'x'; } // creating array with the desired length
    createName1stStep.splice(0, 1, 'M'); // replacing the first letter with 'M'
    createName1stStep.splice(1, 1, 'a'); // replacing the first letter with 'a'

    // adding the defined syllable 'di'
    let createName2ndStep = createName1stStep;
    let syllablePosition = getRandomNumber(2, nameLength - 2);
    createName2ndStep.splice(syllablePosition, 1, 'd');
    createName2ndStep.splice(syllablePosition + 1, 1, 'i');

    // Now we need to know what are the positions that we can insert new letters
    // we can use 'x' inserted before to get those!
    let positionsLeft = [];
    i = 0;

    createName2ndStep.forEach((element, position) => {
        if (createName2ndStep[position] === 'x') {
            positionsLeft[i] = position;
            i++;
        }
    })

    // now let's work with those positions. We know that we need at least 2 more syllables and 2 vowels

    // So let's insert them in one of the positions
    let createName3rdStep = createName2ndStep;

    // this will get a bit messy but we are basically taking a random position from the word
    // (considering those that are free), and replacing them with two random vowels.
    // We will take care of the sillables later.. 
    let randomLeftPosition = getRandomNumber(0, positionsLeft.length - 1);

    let updatePosition = positionsLeft[randomLeftPosition];
    positionsLeft.splice(randomLeftPosition, 1);

    createName3rdStep[updatePosition] = vowelsList[getRandomNumber(0, vowelsList.length - 1)];
    randomLeftPosition = getRandomNumber(0, positionsLeft.length - 1);
    updatePosition = positionsLeft[randomLeftPosition];
    positionsLeft.splice(randomLeftPosition, 1);
    createName3rdStep[updatePosition] = vowelsList[getRandomNumber(0, vowelsList.length - 1)];

    // Now we will add the consonants on the remaining positions
    let createName4thStep = createName3rdStep;
    positionsLeft.forEach((element) => {
        createName4thStep[element] = consonantsList[getRandomNumber(1, consonantsList.length - 1)];
    })

    // Converting the array to one string (word)
    for (letter of createName4thStep) { generatedName += letter; }
    return generatedName;
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function generateGroupNames(generatedNamesQty, nameLength) {
    for (let z = 0; z < generatedNamesQty; z++) {
        groupGeneratedNames[z] = generateName(nameLength);

        // Counting the amount of syllables
        syllablesQty = syllable(groupGeneratedNames[z]).split('|').length;
        let securityFlag = 0, securityFlag2 = 0;
        while ((syllablesQty !== 4) || securityFlag <= 1000) {
            groupGeneratedNames[z] = generateName(nameLength);
            groupGeneratedNames[z] = fixingWeirdCombinations(groupGeneratedNames[z], nameLength);
            syllablesQty = syllable(groupGeneratedNames[z]).split('|').length;
            securityFlag++;
        }
        // uncomment this to run into valid names and find how much iteractions it need to randomly generate it
        // while (((groupGeneratedNames[0] !== namesVerifiedIBGE[0]) &&
        //     (groupGeneratedNames[0] !== namesVerifiedIBGE[1])) &&
        //     securityFlag2 <= 10000) {
        //     securityFlag = 0;
        //     groupGeneratedNames[0] = generateName(nameLength);
        //     groupGeneratedNames[0] = fixingWeirdCombinations(groupGeneratedNames[z], nameLength);
        //     syllablesQty = syllable(groupGeneratedNames[0]).split('|').length;

        //     while ((syllablesQty !== 4) && securityFlag <= 100) {
        //         groupGeneratedNames[0] = generateName(nameLength);
        //         groupGeneratedNames[0] = fixingWeirdCombinations(groupGeneratedNames[z], nameLength);

        //         syllablesQty = syllable(groupGeneratedNames[0]).split('|').length;
        //         securityFlag++;
        //     }
        //     syllablesQty = syllable(groupGeneratedNames[0]).split('|').length;
        //     securityFlag2++;
        //     console.log('Flag 1: ' + securityFlag + ' Flag 2: ' + securityFlag2 + ' name: ' + groupGeneratedNames[0] +
        //         ' Syllables qty: ' + syllablesQty)
        // }
    }
    return groupGeneratedNames;
}

function fixingWeirdCombinations(name, nameLength) {
    // fixing some weird combinations
    let k, y;
    for (k = 2; k < nameLength - 1; k++) {
        for (y = 0; y < consonantsList.length; y++) {
            // fix equal consonants
            if ((name[k] + name[k + 1]) === (consonantsList[y] + consonantsList[y])) {
                // console.log('Fixed equal consonants: ' + name)
                return generateName(nameLength)
            }
            // fix x + anything that is not a vowel
            if ((name[k] + name[k + 1]) === (consonantsList[y] + 'x' + consonantsList[y])) {
                // console.log('Fixed x + anything that is not a vowel: ' + name)
                return generateName(nameLength)
            }
            // fix k + anything that is not a vowel
            if ((name[k] + name[k + 1]) === (consonantsList[y] + 'k' + consonantsList[y])) {
                // console.log('Fixed k + anything that is not a vowel: ' + name)
                return generateName(nameLength)
            }
            // fix j + anything that is not a vowel
            if ((name[k] + name[k + 1]) === ('j' + consonantsList[y])) {
                // console.log('Fixed j + anything that is not a vowel: ' + name)
                return generateName(nameLength)
            }
            // fix t + anything that is not a vowel
            if ((name[k] + name[k + 1]) === ('t' + consonantsList[y])) {
                // console.log('Fixed j + anything that is not a vowel: ' + name)
                return generateName(nameLength)
            }
            // fix f + anything that is not a vowel
            if ((name[k] + name[k + 1]) === ('f' + consonantsList[y])) {
                // console.log('Fixed f + anything that is not a vowel: ' + name)
                return generateName(nameLength)
            }
            // fix w + anything that is not a vowel
            if ((name[k] + name[k + 1]) === (consonantsList[y] + 'w' + consonantsList[y])) {
                // console.log('Fixed w + anything that is not a vowel: ' + name)
                return generateName(nameLength)
            }
        }
        // fix repeated vowels (this is optional)
        for (y = 0; y < vowelsList.length; y++) {
            if ((name[k] + name[k + 1]) === (vowelsList[y] + vowelsList[y])) {
                // console.log('Fixed duplicated vowels: ' + name)
                return generateName(nameLength)
            }
        }

        // fix q + everything that is not u (we need this for because the lenght of the list consider vowels too)
        const consonantsListLessU = consonantsList + vowelsList.replace('u', '');
        for (y = 0; y < consonantsListLessU.length; y++) {
            if ((name[k] + name[k + 1]) === ('q' + consonantsListLessU[y])) {
                // console.log('Fixed q + everything that is not u')
                return generateName(nameLength)
            }
        }
    }
    return name;
}

generatedNamesQty = 10;
nameLength = 7;

let generateNames = generateGroupNames(generatedNamesQty, nameLength)
console.log(generateNames)