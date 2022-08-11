const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const isAuth = (req, res, next) => {
    console.log(req.headers);
    const auth = req.headers.authorization;
    console.log(auth);
    if (!auth || !auth.startsWith('Bearer ')) {
        res.status(StatusCodes.UNAUTHORIZED).send({ msg: 'no token' });
    }
    const token = auth.split(' ')[1];
    console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //alert(decoded._id);
        req.user = { _id: decoded._id, name: decoded.name };
        next();
    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).send({ msg: 'invalid token' });
    }
    /*if (auth) {
                        
                        const token = auth.slice(7, auth.length);
                        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
                            if (err) {
                                res.status(StatusCodes.UNAUTHORIZED).send({ msg: 'invalid token' });
                            } else {
                                req.user = decode;
                                next();
                            }
                        });
                    } else {
                        res.status(StatusCodes.UNAUTHORIZED).send({ msg: 'no token' });
                    }*/
};

module.exports = isAuth;