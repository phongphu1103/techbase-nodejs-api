import express from 'express';

import PositionsController from '../controllers/positions/PositionsController';
import PositionsValidator from '../controllers/positions/PositionsValidator';
import ValidatorHandling from '../middlewares/ValidatorHandling';

const router = express.Router();

router.get('/index/:pk?', PositionsController.get_index);
router.post('/store', ValidatorHandling(PositionsValidator.postCreateRecord), PositionsController.store.bind(PositionsController));
router.put('/update/:pk', ValidatorHandling(PositionsValidator.putUpdateRecord), PositionsController.update.bind(PositionsController));

export default router;