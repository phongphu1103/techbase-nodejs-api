import express from "express"

import AuthHandling from '../middlewares/AuthHandling';

import AuthRoutes from './AuthRoutes';
import OrganizationRoutes from './OrganizationRoutes';
import PositionRoutes from './PositionRoute';
import UserRoutes from './UserRoutes';

const router = express.Router()

router.use('/api/v1/auth', AuthRoutes);
router.use('/api/v1/organizations', AuthHandling, OrganizationRoutes);
router.use('/api/v1/positions', AuthHandling, PositionRoutes);
router.use('/api/v1/users', AuthHandling, UserRoutes);

export default router;