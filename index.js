require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error_middleware');
const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware);
const start = async() => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        })
        app.listen(PORT, () => console.log('server start ' + PORT))
    } catch (e) {
        console.log(e);
    }
}

start();