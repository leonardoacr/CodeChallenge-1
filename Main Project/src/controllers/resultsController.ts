import { verifyIBGE } from '../helpers/verifyIBGEData';
import { Request, Response } from 'express';
import { generateNamesRequest } from '../helpers/generateNames';
import displayNameSearchResults from '../helpers/renderResults';

export const processGroupNamesRequest = async (
  request: Request,
  response: Response
) => {
  // generate names
  const { generateNames, generateNamesFixed } = await generateNamesRequest(
    request
  );

  // verify IBGE data
  const { namesThatExist, peopleQtyWithTheName } = await verifyIBGE(
    generateNames
  );

  // define variables for rendering results
  const textStringText = '';
  const textStringResults = '';

  // render results
  displayNameSearchResults(
    namesThatExist,
    textStringText,
    textStringResults,
    generateNamesFixed,
    peopleQtyWithTheName,
    response
  );
};
