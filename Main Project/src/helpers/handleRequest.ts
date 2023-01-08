import { getCheckboxes } from './getCheckboxes';
import { Request } from 'express';

export const handleRequest = async (request: Request) => {
  const nameLength: number = request.body.nameLength;
  const updatedConsonantList: string = getCheckboxes(request);
  const namesQty = request.body.namesQty;
  return { nameLength, updatedConsonantList, namesQty };
};
