import express from 'express';
import { secureRoute } from '../../auth/auth.middleware';
import { authenticateUser, getAllUsers, getUserSetting, updateUserSetting, update } from './controller';

const router = express.Router();

/* GET users listing. */
router.get('/', secureRoute, getAllUsers);
router.get('/settings', secureRoute, getUserSetting);
router.post('/authenticate', secureRoute, authenticateUser);
router.post('/settings', secureRoute, updateUserSetting);
router.put('/:id', update);

export default router;
