import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

//Error Creator
import { createError } from '../error.js';

//MongoDB Models
import User from '../models/User.js';

//! SIGN-UP
export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const passwordCrypt = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: passwordCrypt });
        await newUser.save();
        res.status(200).send('User has been created!');
    } catch (err) {
        next(err);
        // next(createError(404, 'Not Found Sorry!'));
    }
};

//! SIGN-IN
export const signin = async (req, res, next) => {
    try {
        //user'ı arıyoruz.
        const user = await User.findOne({ name: req.body.name });
        //user db'de yoksa middleware ile hata oluşturup dönüyoruz.
        if (!user) return next(createError(404, 'User not found!'));
        //kullanıcı varsa password'ünü alıp db'deki crypto'lanmış password ile karşılaştırıyoruz
        //eğer şifre yanlış ise hata oluşturup dönüyoruz.
        const passworValidation = await bcrypt.compare(req.body.password, user.password);
        if (!passworValidation) return next(createError(400, 'Wrong password!'));
        //eğer şifre doğru ise jwt oluşturuyoruz.
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        //token'ı response'daki cookie içerisine koyuyoruz.
        //user'ın ilgili prop'larını json olarak dönüyoruz.
        const { password, ...others } = user._doc;
        res.cookie('access_token', token, {
            httpOnly: true,
        })
            .status(200)
            .json(others);
    } catch (err) {
        next(err);
        // next(createError(404, 'Not Found Sorry!'));
    }
};
