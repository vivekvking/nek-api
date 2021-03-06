require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const app = express();
const tracksRouter = require('./rackss/tracks-router');
const usersRouter =require('./users/users-router');
const authRouter = require('./auth/auth-router');
const hikesRouter = require('./hikes/hikes-router');
const morganOption = (NODE_ENV === 'production')? 'tiny' : 'common';

const {CLIENT_ORIGIN} = require('./config');

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(authRouter);
app.use(usersRouter);
app.use(tracksRouter);
app.use(hikesRouter);


app.get('/', (req, res) => {
    res.send('Hello, from Trail capstone!');
});

app.use(function errorHandler(error, req, res, next) {
    let response;
    if(NODE_ENV === 'production') {
        response = { error: { message: 'server error'} };
    } else {
        console.error(error);
        response = { message: error.message, error };
    }
    res.status(500).json(response);
});

module.exports = app;
