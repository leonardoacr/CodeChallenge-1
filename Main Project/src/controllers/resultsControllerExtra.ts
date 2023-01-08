import { Request, Response } from 'express';
import displayNameSearchResultsExtra from '../helpers/renderResultsExtra';
import { getNameStatisticsFromIBGE } from '../helpers/verifyIBGEData';
import { validateNames } from '../modules/verifyNames';

export const processNameRequestExtra = async (
  request: Request,
  response: Response
) => {
  const nameToValidate: string[] = [];
  let dataFromIBGEExtra: { res: [{ frequencia: number }] }[] = [];
  const peopleQtyWithTheNameExtra = 0;

  nameToValidate[0] = request.body.nameExtra;

  const nameToValidateFixed =
    nameToValidate[0][0].toUpperCase() + nameToValidate[0].substring(1);
  const textStringExtra =
    nameToValidateFixed + (await validateNames(nameToValidate));

  // Wait for the verifyIBGE function to resolve before assigning its result to the dataFromIBGEExtra variable
  dataFromIBGEExtra = JSON.parse(
    (await getNameStatisticsFromIBGE(nameToValidate[0])) as string
  );
  await displayNameSearchResultsExtra(
    textStringExtra,
    nameToValidateFixed,
    dataFromIBGEExtra,
    peopleQtyWithTheNameExtra,
    response
  );
};
