import { Response } from 'express';

const renderResults = async (
  generateNamesFixed: string[],
  textStringText: string,
  textStringResults: string,
  res: Response
) => {
  const renderObject = {
    generatedNames: generateNamesFixed,
    textStringText: textStringText,
    textStringResults: textStringResults
  };
  return res.render('results', renderObject);
};

const displayNameSearchResults = (
  namesThatExist: string[],
  textStringText: string,
  textStringResults: string,
  generateNamesFixed: string[],
  peopleQtyWithTheName: number[],
  res: Response
) => {
  if (namesThatExist.length !== 0) {
    textStringText +=
      'these names were found on the government database (with total of people with it): \n';
    for (let z = 0; z < namesThatExist.length; z++) {
      textStringResults += namesThatExist[z] + ' | ';
      textStringResults += peopleQtyWithTheName[z] + '\n';
    }
  } else {
    textStringText += 'no one has this name in Brazil.';
  }
  return renderResults(
    generateNamesFixed,
    textStringText,
    textStringResults,
    res
  );
};

export default displayNameSearchResults;
