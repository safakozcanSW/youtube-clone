import { createError } from '../error.js';

//MODELS
import User from '../models/User.js';
import Video from '../models/Video.js';

export const updateUser = async (req, res, next) => {
    //1)verifyToken'dan geçip buraya geldiği için req user'a sahip olarak gelecektir.
    //2)req.params'daki id user'ın id'sine sahipse req.params.id'deki user'ı güncelleriz.
    //3)Hata varsa hatayı döneriz.
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true } //güncellenmiş halini döndürür.
            );
            res.status(200).json(updatedUser);
        } catch (error) {
            next(err);
        }
    } else {
        return next(createError(403, 'Sadece kendi hesabınızı güncelleyebilirsiniz!'));
    }
};
export const deleteUser = async (req, res, next) => {
    //1)verifyToken'dan geçip buraya geldiği için req user'a sahip olarak gelecektir.
    //2)req.params'daki id user'ın id'sine sahipse req.params.id'deki user'ı sileriz
    //3)Hata varsa hatayı döneriz.
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Kullanıcı başarıyla silindi!');
        } catch (error) {
            next(err);
        }
    } else {
        return next(createError(403, 'Sadece kendi hesabınızı silebilirsiniz!'));
    }
};
export const getUser = async (req, res, next) => {
    //1) getUser için authenticate olunmasına gerek yoktur.
    //2) direk kullanıcıyı arayıp getirebiliriz.
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        next(err);
    }
};
export const subscribe = async (req, res, next) => {
    try {
        //1)Kendi user hesabımızı buluruz.
        //2)Abone olmak istediğimiz kanalın req.params.id'sini subscribedUsers'ımıza ekleriz.
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id },
        });
        //3)Daha sonra abone olduğumuz kanalı bulup subscribesrs'ını 1 arttırırız.
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 },
        });
        res.status(200).json('Abone olma işlemi başarılı!');
    } catch (err) {
        next(err);
    }
};
export const unsubscribe = async (req, res, next) => {
    try {
        //1)Kendi user hesabımızı buluruz.
        //2)Abonelikten çıkmak olmak istediğimiz kanalın req.params.id'sini subscribedUsers'dan sileriz.
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id },
        });
        //3)Daha sonra abone olduğumuz kanalı bulup subscribesrs'ını 1 azaltırız.
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 },
        });
        res.status(200).json('Abonelikten çıkma işlemi başarılı!');
    } catch (err) {
        next(err);
    }
};
export const like = async (req, res, next) => {
    const userId = req.user.id;
    const videoId = req.params.videoId;
    try {
        //Video'yu zaten beğendiysem bir daha beğenmeyiz.(push yerine addToSet)
        //Aynı zamanda beğendiğimiz için dislikes'dan kendimizi çıkartıyoruz.
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: userId },
            $pull: { dislikes: userId },
        });
        res.status(200).json('Video Beğenilere Eklendi!');
    } catch (error) {
        next(error);
    }
};
export const dislike = async (req, res, next) => {
    const userId = req.user.id;
    const videoId = req.params.videoId;
    try {
        //Video'yu zaten dislike ettiysek bir daha etmeyiz.(push yerine addToSet)
        //Aynı zamanda dislike ettğimiz için likes'dan kendimizi çıkartıyoruz.
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: userId },
            $pull: { likes: userId },
        });
        res.status(200).json('Video Beğenilerden Çıkarıldı!');
    } catch (error) {
        next(error);
    }
};
