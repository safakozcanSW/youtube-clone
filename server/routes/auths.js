import express from 'express';

//Controllers
import { googleAuth, logOut, signin, signup } from '../controllers/auth.js';
//Router
const router = express.Router();

//!CREATE A USER
router.post('/signup', signup);

//!SIGN IN
router.post('/signin', signin);

//!LOG OUT
router.post('/logout', logOut);

//!GOOGLE AUTH
router.post('/google', googleAuth);

export default router;
