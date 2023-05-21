//ERROR CREATOR METHOD
import { createError } from '../error.js';

//MODELS
import User from '../models/User.js';
import Video from '../models/Video.js';

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (err) {
        next(err);
    }
};
export const updateVideo = async (req, res, next) => {
    try {
        //1)parametreden gelen id'ye sahip video aranır.
        const video = await Video.findById(req.params.id);
        //2)Bulunamazsa 404 döndürürüz.
        if (!video) return next(createError(404, 'Video Bulunamadı!'));
        //3)Bulunursa auth olan user'ın id'si ile video'nun sahibi olan userId eşit ise güncelle
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true,
                }
            );
            res.status(200).json(updatedVideo);
        } else {
            //4) auth olan user'ın id'si ile video'nun sahibi olan userId eşit değilse
            //   videonun sahibi başkadır.
            return next(createError(403, 'Sadece kendi videonu güncelleyebilirsin!'));
        }
    } catch (err) {
        next(err);
    }
};
export const deleteVideo = async (req, res, next) => {
    try {
        //1)parametreden gelen id'ye sahip video aranır.
        const video = await Video.findById(req.params.id);
        //2)Bulunamazsa 404 döndürürüz.
        if (!video) return next(createError(404, 'Video Bulunamadı!'));
        //3)Bulunursa auth olan user'ın id'si ile video'nun sahibi olan userId eşit ise
        //  videoyusil
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json('Video silme işlemi başarılı!');
        } else {
            //4) auth olan user'ın id'si ile video'nun sahibi olan userId eşit değilse
            //   videonun sahibi başkadır.
            return next(createError(403, 'Sadece kendi videonu silebilirsin!'));
        }
    } catch (err) {
        next(err);
    }
};
export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
};
export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        });
        res.status(200).json('Video izlenme sayısı 1 arttırıldı!');
    } catch (err) {
        next(err);
    }
};
export const trend = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};
export const random = async (req, res, next) => {
    try {
        //rastgele 40 tane video getirir.
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};
export const subscribe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;
        const list = await Promise.all(
            subscribedChannels.map((channelId) => {
                return Video.find({ userId: channelId });
            })
        );
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
        next(err);
    }
};
export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(',');
    console.log(tags);
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};
export const search = async (req, res, next) => {
    const query = req.query.q;
    try {
        const videos = await Video.find({
            title: { $regex: query, $options: 'i' },
        }).limit(40);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};
