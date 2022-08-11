const express = require('express');
const Job = require('../models/Job');
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const isAuth = require('../middlware/auth');

const jobRouter = express.Router();

jobRouter.post(
    '/postjob',
    asyncHandler(async(req, res) => {
        // req.body.createdBy = req.user._id;
        const job = await Job.create(req.body);
        res.status(StatusCodes.CREATED).json({ job });
    })
);

jobRouter.get(
    '/getjob/job/:id',
    asyncHandler(async(req, res) => {
        // console.log(req);
        // console.log(req.params.id);

        //alert(req.params.id);
        const job = await Job.findById(req.params.id);
        if (job) {
            return res.status(StatusCodes.OK).send(job);
        } else {
            return res.status(StatusCodes.NOT_FOUND).send({ msg: 'not found' });
        }
    })
);

jobRouter.get(
    '/getjob/:_id',
    asyncHandler(async(req, res) => {
        const { _id } = req.params;
        //console.log(req.params);
        const jobs = await Job.find({ createdBy: _id });
        return res.status(StatusCodes.OK).send(jobs);
    })
);

jobRouter.patch(
    '/editjob/:id',

    asyncHandler(async(req, res) => {
        let queryObject = {};
        // console.log(req.body.started);
        if (req.body.function) {
            queryObject.function = req.body.function;
        }
        if (req.body.company) {
            queryObject.company = req.body.company;
        }
        if (req.body.started) {
            queryObject.started = req.body.started;
        }
        if (req.body.finished) {
            queryObject.finished = req.body.finished;
        }
        try {
            //console.log(req.params.id);
            // console.log(queryObject);
            const newJob = await Job.findByIdAndUpdate({ _id: req.params.id },
                queryObject, {
                    new: true,
                    runValidators: true,
                }
            );

            res.status(StatusCodes.OK).send({ msg: 'updated' });
        } catch (err) {
            res.status(StatusCodes.NOT_FOUND).send({ msg: err.message });
        }
    })
);

jobRouter.get(
    '/getjobs/:function',
    asyncHandler(async(req, res) => {
        //console.log('params' + req.params);
        let requestObject = {};
        if (req.params.function) {
            requestObject.function = { $regex: req.params.function, $options: 'i' };
        }

        try {
            //console.log('request objet' + requestObject);
            const results = await Job.find(requestObject);
            //console.log('results' + results);
            res.status(StatusCodes.OK).send(results);
        } catch (err) {
            console.log(err.message);
        }
    })
);

jobRouter.get(
    '/getjobs/getusersjobs/:createdBy',
    asyncHandler(async(req, res) => {
        //console.log('params' + req.params);
        let requestObject = {};

        requestObject.createdBy = req.params.createdBy;

        try {
            // console.log('request objet' + requestObject);
            const results = await Job.find(requestObject);
            // console.log('results' + results);
            res.status(StatusCodes.OK).send(results);
        } catch (err) {
            console.log(err.message);
        }
    })
);

jobRouter.post(
    '/',
    isAuth,
    asyncHandler(async(req, res) => {
        //console.log(req.user);
        //res.send({ msg: 'sent' });
        req.body.createdBy = req.user._id;
        const job = await Job.create(req.body);
        res.status(StatusCodes.CREATED).json({ job });
    })
);

module.exports = jobRouter;