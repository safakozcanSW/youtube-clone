import express from 'express';

//Controllers
import { signin, signup } from '../controllers/auth.js';
//Router
const router = express.Router();

//!CREATE A USER
router.post('/signup', signup);

//!SIGN IN
router.post('/signin', signin);

//!GOOGLE AUTH
router.post('/google');

export default router;
