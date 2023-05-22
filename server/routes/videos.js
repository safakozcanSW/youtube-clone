import express from 'express';
import { verifyToken } from '../verifyToken.js';

//CONTROLLERS
import {
    addVideo,
    addView,
    deleteVideo,
    getVideo,
    random,
    trend,
    updateVideo,
    subscribe,
    getByTag,
    search,
} from '../controllers/video.js';

const router = express.Router();

//CREATE VIDEO + VERIFY TOKEN
router.post('/', verifyToken, addVideo);
//UPDATE VIDEO + VERIFY TOKEN
router.put('/:id', verifyToken, updateVideo);
//DELETE VIDEO + VERIFY TOKEN
router.delete('/:id', verifyToken, deleteVideo);
//SUBSCRIBE VIDEOS + VERIFY TOKEN
router.get('/subscribe', verifyToken, subscribe);
//GET VIDEO
router.get('/find/:id', getVideo);
//INCREMENT VIDEO VIEWS
router.put('/view/:id', addView);
//GET TREND VIDEOS
router.get('/trend', trend);
//GET RANDOM VIDEOS
router.get('/random', random);
//GET WITH TAGS VIDEOS
router.get('/tags', getByTag);
//GET SEARCH VIDEOS
router.get('/search', search);

export default router;
