import jwt from 'jsonwebtoken';

//CREATE ERROR METHOD
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
    //1)req'in cookie'lerinden access_token'ı alır
    //2)token yoksa authenticate olmamıştır. Hata döndürürüz.
    //3)token varsa verify ederiz. err ya da user'ı verir.
    //4)err varsa hata döneriz, yoksa req'e verify edilmiş user'ı ekleriz.
    //5)next()ile middleware'den çıkıp işleme devam ederiz.req artık user'a sahiptir.
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, 'You are not authenticated!'));

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(401, 'Token is not valid!'));
        req.user = user;
        next();
    });
};
