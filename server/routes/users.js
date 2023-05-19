import express from 'express';
import { test } from '../controllers/user.js';

const router = express.Router();

//UPDATE USER

//DELETE USER

//GET A USER

//SUBSCRIBE A USER

//UNSUBSCRIBE A USER

//LIKE A VIDEO

//DISLIKE A VIDEO

router.get('/test', test);

export default router;
