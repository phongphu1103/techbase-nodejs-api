import express from "express"

import Authenticate from '../middlewares/Authenticate';

import AuthRoutes from './AuthRoutes';
import OrganizationRoutes from './OrganizationRoutes';
import PositionRoutes from './PositionRoute';
import UserRoutes from './UserRoutes';

const router = express.Router()

router.use('/api/v1/auth', AuthRoutes);
router.use('/api/v1/organizations', Authenticate, OrganizationRoutes);
router.use('/api/v1/positions', Authenticate, PositionRoutes);
router.use('/api/v1/users', Authenticate, UserRoutes);

export default router;