import { Request } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCheckboxes = (request: Request) => {
  const consonantsList = 'bcdfghjklmnpqrstwvxyz';

  let consonantsToDeleteState;
  const consonantsToDelete = [];
  let updatedConsonantList = consonantsList;

  // this loop is responsible for getting the checkboxes status
  for (let letter = 0; letter <= consonantsList.length - 1; letter++) {
    try {
      consonantsToDeleteState = eval(
        'request.body.deleteConsonant_' + consonantsList[letter]
      );
    } catch (error) {
      if (error instanceof ReferenceError) {
        // Provide a default value for consonantsToDeleteState
        consonantsToDeleteState = 'off';
      } else {
        // Re-throw the error if it is not a ReferenceError
        throw error;
      }
    }
    if (consonantsToDeleteState === 'on') {
      consonantsToDelete[letter] = consonantsList[letter];
    }
  }
  console.log('Consonants to delete: ' + consonantsToDelete);
  // and this one will update the consonants list with only the ones that left
  for (const element of consonantsToDelete) {
    updatedConsonantList = updatedConsonantList.replace(element, '');
  }
  return updatedConsonantList;
};
