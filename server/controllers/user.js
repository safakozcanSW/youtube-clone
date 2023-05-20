import { createError } from '../error.js';

//MODELS
import User from '../models/User.js';

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
        await User.findById(req.user.id, {
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
        await User.findById(req.user.id, {
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
    res.json("It's Successfull!");
};
export const dislike = async (req, res, next) => {
    res.json("It's Successfull!");
};
