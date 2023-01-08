// require https lib to send the data as response
import https from 'https';
import { IncomingMessage } from 'http';
import axios from 'axios';

// function that get the name with the IBGE API
export type MyResponse = {
  statusCode: number;
  on: (event: string, listener: (data: [string, number]) => void) => void;
  // other properties and methods of the response object
};

export const getNameStatisticsFromIBGE = async (name: string) => {
  const url = 'https://servicodados.ibge.gov.br/api/v2/censos/nomes/' + name;

  const result = new Promise((resolve) => {
    https.get(url, (response: IncomingMessage) => {
      if (response.statusCode !== 200) {
        alert('Error on response');
      } else {
        response.on('data', (dataNames: [string, number]) => {
          resolve(dataNames);
        });
      }
    });
  });
  return result;
};

// this loop will verify all names according to IBGE API
export const verifyIBGE = async (generateNames: string[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataFromIBGE: any = [],
    namesThatDontExist: string[] = [],
    namesThatExist: string[] = [],
    peopleQtyWithTheName: number[] = [];
  // indexes for arrays
  let i = 0,
    j = 0;
  for (let k = 0; k < generateNames.length; k++) {
    dataFromIBGE[k] = JSON.parse(
      (await getNameStatisticsFromIBGE(generateNames[k])) as string
    );

    if (dataFromIBGE[k].length === 0) {
      namesThatDontExist[i] = generateNames[k];
      i++;
    } else {
      namesThatExist[j] = generateNames[k];
      peopleQtyWithTheName[j] = 0;
      for (let z = 0; z < dataFromIBGE[k][0].res.length; z++) {
        peopleQtyWithTheName[j] += dataFromIBGE[k][0].res[z].frequencia;
      }
      j++;
    }
    console.log(
      `Still working on it... One more name saved: [${k + 1}] Found names: ${j}`
    );
    // Send a POST request to the /processing route with the data
    // local hosting:
    // axios.post('http://localhost:3000/processing', { index: k + 1, count: j });

    // render hosting:
    axios.post('https://codechallenge-1.onrender.com/processing', { index: k + 1, count: j });

  }
  return { namesThatExist, peopleQtyWithTheName };
};
