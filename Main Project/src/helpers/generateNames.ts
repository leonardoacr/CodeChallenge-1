import { generateGroupNames } from '../modules/coreFunctions';
import { breakLinesEJS } from './breakLineEJS';
import { handleRequest } from './handleRequest';
import { Request } from 'express';

export const generateNamesRequest = async (request: Request) => {
  const { nameLength, updatedConsonantList, namesQty } = await handleRequest(
    request
  );

  // generate names based on quantity, length and the updated list of consonants
  const generateNames: string[] = generateGroupNames(
    namesQty,
    nameLength,
    updatedConsonantList
  );

  // this is necessary to break the lines on EJS.
  const generateNamesFixed = breakLinesEJS(nameLength, generateNames);
  return { generateNames, generateNamesFixed };
};
