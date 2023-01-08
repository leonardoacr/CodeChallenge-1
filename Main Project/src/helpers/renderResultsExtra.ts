import { Response } from 'express';

const renderResultsExtra = (textStringExtra: string, response: Response) => {
  const renderObjectExtra = {
    textStringText: textStringExtra
  };

  return response.render('extra-results', renderObjectExtra);
};

const displayNameSearchResultsExtra = (
  textStringExtra: string,
  nameToValidateFixed: string,
  dataFromIBGEExtra: { res: [{ frequencia: number }] }[],
  peopleQtyWithTheNameExtra: number,
  response: Response
) => {
  if (textStringExtra === nameToValidateFixed + ' was validated.') {
    if (dataFromIBGEExtra.length === 0) {
      textStringExtra +=
        ' But according to IBGE (Brazilian Institute of Geography and Statistics)' +
        ' there is no one with this name in Brazil.';
    } else {
      peopleQtyWithTheNameExtra = 0;
      for (let z = 0; z < dataFromIBGEExtra[0].res.length; z++) {
        peopleQtyWithTheNameExtra += dataFromIBGEExtra[0].res[z].frequencia;
      }
      textStringExtra +=
        ' And it was found on the Brazilian government database that there were ' +
        peopleQtyWithTheNameExtra +
        ' people with this name in Brazil until the year 2010.';
    }
  }

  return renderResultsExtra(textStringExtra, response);
};

export default displayNameSearchResultsExtra;
