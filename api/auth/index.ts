import express from 'express';
import passport from '../../auth/auth';
import { failureHandler, redirectHandler } from './controller';

const router = express.Router();

router.get('/', passport.authenticate('azure_ad_oauth2'));
router.get('/redirect', passport.authenticate('azure_ad_oauth2', { failureRedirect: '/auth/failure', session: false }), redirectHandler);
router.get('/failure', failureHandler);

export default router;
