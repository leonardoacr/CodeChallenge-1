import { Router } from 'express';
import * as resultsController from '../controllers/resultsController';
import * as homeController from '../controllers/homeController';

const router = Router();

router.get('/', homeController.getHomePage);

router.post('/results', resultsController.processGroupNamesRequest);

// dealing with data from verifyIBGEData.ts
let index: number, count: number;
router.get('/processing', (req, res) => {
  const sendObject = {
    index: index,
    count: count
  };

  res.json(sendObject);
});

router.post('/processing', (req, res) => {
  index = req.body.index;
  count = req.body.count;
  res.redirect('/processing');
});

export default router;
