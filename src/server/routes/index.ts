import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CidadesController } from './../controllers';

const router = Router();

router.get('/', (req, res) => res.send("Hello"));

router.post('/cidades', CidadesController.validateBody, CidadesController.create);

export { router };