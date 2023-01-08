// eslint-disable-next-line @typescript-eslint/no-var-requires
const { syllable } = require('stress-pt');

export const validateNames = (names: string[]) => {
  const formattedNames = names.map((name) =>
    name.toLowerCase().replace(/[^a-z]/g, '')
  );
  const specialCharacters = formattedNames.some((name) => /[^a-z]/.test(name));

  if (specialCharacters) {
    return 'The names can not have special characters...';
  }

  return verifyNames(formattedNames);
};

export const verifyNames = (names: string[]) => {
  const validNames: string[] = [];
  let stringText = '';

  for (const name of names) {
    if (!name.startsWith('ma')) {
      stringText = ` was not validated because it does not start with "Ma"`;
      continue;
    }

    const numVowels = name.match(/[aeiou]/g)?.length;
    if (numVowels !== 4) {
      stringText = ` was not validated because it does not have exactly 4 vowels`;
      continue;
    }

    const numSyllables = syllable(name).split('|').length;
    if (numSyllables !== 4) {
      stringText = ` was not validated because it does not have exactly 4 syllables`;
      continue;
    }

    if (!name.includes('di')) {
      stringText = ` was not validated because it does not have the syllable "di"`;
      continue;
    }

    validNames.push(name);
  }

  if (validNames.length === 0) {
    return stringText;
  }

  return ` was validated.`;
};
