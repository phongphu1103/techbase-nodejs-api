import express from 'express';

import OrganizationsController from '../controllers/organizations/OrganizationsController';
import OrganizationsValidator from '../controllers/organizations/OrganizationsValidator';
import ValidatorHandling from '../middlewares/ValidatorHandling';

const router = express.Router();

router.get('/index/:pk?', OrganizationsController.get_index);
router.post('/index', ValidatorHandling(OrganizationsValidator.postCreateRecord), OrganizationsController.post_index);
router.put('/index/:pk', ValidatorHandling(OrganizationsValidator.putUpdateRecord), OrganizationsController.put_index);

export default router;