import { Router } from 'express';
import * as resultsControllerExtra from '../controllers/resultsControllerExtra';
import * as homeControllerExtra from '../controllers/homeControllerExtra';

const router = Router();

router.post('/extra', homeControllerExtra.postHomeExtra);

router.post('/extra-results', resultsControllerExtra.processNameRequestExtra);

export default router;
