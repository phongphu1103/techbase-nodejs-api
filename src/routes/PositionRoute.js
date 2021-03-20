import express from 'express';

import PositionsController from '../controllers/positions/PositionsController';
import PositionsValidator from '../controllers/positions/PositionsValidator';
import ValidatorHandling from '../middlewares/ValidatorHandling';

const router = express.Router();

router.get('/index/:pk?', PositionsController.get_index);
router.post('/index', ValidatorHandling(PositionsValidator.postCreateRecord), PositionsController.post_index);
router.put('/index/:pk',ValidatorHandling(PositionsValidator.putUpdateRecord), PositionsController.put_index);

export default router;