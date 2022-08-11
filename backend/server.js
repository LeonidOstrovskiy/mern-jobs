require('dotenv').config();

const path = require('path');

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const connectDB = require('./db/connect');
const notFound = require('./middlware/notFound');
const userRouter = require('./routes/User');
const jobRouter = require('./routes/Job');
const { appendFile } = require('fs');

//const cors = require('cors');
const port = process.env.PORT || 5000;

const server = express();
server.use(express.json());

server.set('trust proxy', 1);
server.use(
    rateLimiter({
        windowsMs: 15 * 60 * 1000,
        max: 100,
    })
);
server.use(helmet());
server.use(cors());
server.use(xss());

server.get('/', (req, res) => {
    res.send('test');
});
//server.use(cors);

server.use('/api/v1/users/', userRouter);
server.use('/api/v1/jobs/', jobRouter);

const _dirname = path.resolve();
server.use(express.static(path.join(_dirname, '/frontend/build')));
server.get('*', (req, res) =>
    res.sendFile(path.join(_dirname, '/frontend/build/index.html'))
);

server.use(notFound);

//server.use(express.static(path.join(__dirname, '/frontend/build')));

/*server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});*/

const start = async() => {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () => {
        console.log(`server on port  ${port}`);
    });
};

start();