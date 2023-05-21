//MODELS
import Comment from '../models/Comment.js';
import Video from '../models/Video.js';
//ERROR CREATE METHOD
import { createError } from '../error.js';

export const addComment = async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    try {
        const savedComment = await newComment.save();
        res.status(200).send(savedComment);
    } catch (error) {
        next(error);
    }
};
export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(res.params.id);
        const video = await Video.findById(res.params.id);
        //Yorumun kullanıcısı biz isek ya da videonun sahibi biz isek silebiliriz
        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json('Yorum Silme Başarılı!');
        } else {
            return next(createError(403, 'Bu yorumu silme yetkiniz yok!'));
        }
        res.json("It's Successfull!");
    } catch (error) {
        next(error);
    }
};
export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId });
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};
