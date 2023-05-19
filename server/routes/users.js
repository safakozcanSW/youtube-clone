import express from 'express';
import {
    deleteUser,
    dislike,
    getUser,
    like,
    subscribe,
    unsubscribe,
    updateUser,
} from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

//UPDATE USER + VERIFY TOKEN
router.put('/:id', verifyToken, updateUser);

//DELETE USER
router.delete('/:id', deleteUser);

//GET A USER
router.get('/find/:id', getUser);

//SUBSCRIBE A USER
router.put('/subscribe/:id', subscribe);

//UNSUBSCRIBE A USER
router.put('/unsubscribe/:id', unsubscribe);

//LIKE A VIDEO
router.put('/like/:videoId', like);

//DISLIKE A VIDEO
router.put('/dislike/:videoId', dislike);

export default router;
