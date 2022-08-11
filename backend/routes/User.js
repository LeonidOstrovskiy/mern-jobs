const express = require('express');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

const generateToken = (user) => {
    return jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
        },
        process.env.JWT_SECRET, { expiresIn: '30d' }
    );
};

userRouter.get(
    '/login/:email',
    asyncHandler(async(req, res) => {
        const user = await User.findOne({ email: req.params.email });
        return res.status(StatusCodes.OK).send({
            name: user.name,
            _id: user._id,
        });
    })
);

userRouter.get(
    '/:_id',
    asyncHandler(async(req, res) => {
        const user = await User.findOne({ _id: req.params._id });
        return res.status(StatusCodes.OK).send({
            name: user.name,
        });
    })
);

userRouter.post(
    '/login',
    asyncHandler(async(req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.status(StatusCodes.OK).send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user),
                });
                return;
            }
        }
        res
            .status(StatusCodes.UNAUTHORIZED)
            .send({ msg: 'invalid email or password' });
    })
);

userRouter.post(
    '/signup',
    asyncHandler(async(req, res) => {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
        });

        const user = await newUser.save();
        res.status(StatusCodes.CREATED).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user),
        });
    })
);

module.exports = userRouter;