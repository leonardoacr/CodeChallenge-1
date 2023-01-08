import { generateName, vowelsList } from './coreFunctions';

export const fixingWeirdCombinations = (
  name: string,
  nameLength: number,
  updatedConsonantList: string
) => {
  // fixing some weird combinations
  let k, y;
  for (k = 2; k < nameLength - 1; k++) {
    for (y = 0; y < updatedConsonantList.length; y++) {
      // fix equal consonants
      if (
        name[k] + name[k + 1] ===
        updatedConsonantList[y] + updatedConsonantList[y]
      ) {
        return generateName(nameLength, updatedConsonantList);
      }
      // fix x + anything that is not a vowel
      if (
        name[k] + name[k + 1] ===
        updatedConsonantList[y] + 'x' + updatedConsonantList[y]
      ) {
        return generateName(nameLength, updatedConsonantList);
      }
      // fix k + anything that is not a vowel
      if (
        name[k] + name[k + 1] ===
        updatedConsonantList[y] + 'k' + updatedConsonantList[y]
      ) {
        return generateName(nameLength, updatedConsonantList);
      }
      // fix j + anything that is not a vowel
      if (name[k] + name[k + 1] === 'j' + updatedConsonantList[y]) {
        return generateName(nameLength, updatedConsonantList);
      }
      // fix t + anything that is not a vowel
      if (name[k] + name[k + 1] === 't' + updatedConsonantList[y]) {
        return generateName(nameLength, updatedConsonantList);
      }
      // fix f + anything that is not a vowel
      if (name[k] + name[k + 1] === 'f' + updatedConsonantList[y]) {
        return generateName(nameLength, updatedConsonantList);
      }
      // fix w + anything that is not a vowel
      if (
        name[k] + name[k + 1] ===
        updatedConsonantList[y] + 'w' + updatedConsonantList[y]
      ) {
        return generateName(nameLength, updatedConsonantList);
      }
    }
    // fix repeated vowels (this is optional)
    for (y = 0; y < vowelsList.length; y++) {
      if (name[k] + name[k + 1] === vowelsList[y] + vowelsList[y]) {
        return generateName(nameLength, updatedConsonantList);
      }
    }

    // fix q + everything that is not u (we need this for because the lenght of the list consider vowels too)
    const consonantsListLessU =
      updatedConsonantList + vowelsList.replace('u', '');
    for (y = 0; y < consonantsListLessU.length; y++) {
      if (name[k] + name[k + 1] === 'q' + consonantsListLessU[y]) {
        return generateName(nameLength, updatedConsonantList);
      }
    }
  }
  return name;
};
