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

//UPDATE USER + VERIFY TOKEN(user güncellemek için giriş yapılmış olması gerekir)
router.put('/:id', verifyToken, updateUser);

//DELETE USER + VERIFY TOKEN(user silmek için giriş yapılmış olması gerekir)
router.delete('/:id', verifyToken, deleteUser);

//GET USER(user getirmek için giriş yapılmasına gerek yoktur)
router.get('/find/:id', getUser);

//SUBSCRIBE + VERIFY TOKEN(user'a abone olmak için giriş yapılmış olması gerekir)
router.put('/subscribe/:id', verifyToken, subscribe);

//UNSUBSCRIBE + VERIFY TOKEN(user aboneliğiden çıkmak için giriş yapılmış olması gerekir)
router.put('/unsubscribe/:id', verifyToken, unsubscribe);

//LIKE VIDEO + VERIFY TOKEN(user'ın videosunu like'lamak için giriş yapılmış olması gerekir)
router.put('/like/:videoId', verifyToken, like);

//DISLIKE VIDEO + VERIFY TOKEN(user'ın videosunu dislike'lamak için giriş yapılmış olması gerekir)
router.put('/dislike/:videoId', verifyToken, dislike);

export default router;
