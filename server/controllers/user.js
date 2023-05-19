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
export const deleteUser = (req, res, next) => {
    res.json("It's Successfull!");
};
export const getUser = (req, res, next) => {
    res.json("It's Successfull!");
};
export const subscribe = (req, res, next) => {
    res.json("It's Successfull!");
};
export const unsubscribe = (req, res, next) => {
    res.json("It's Successfull!");
};
export const like = (req, res, next) => {
    res.json("It's Successfull!");
};
export const dislike = (req, res, next) => {
    res.json("It's Successfull!");
};
