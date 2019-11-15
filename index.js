/*jshint esversion: 6 */
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
// const cors = require('cors');
const router = require('./src/router');
const expressValidator = require('express-validator');
const port = 3000;

app.set('views', path.join(__dirname, './views/')); // 默認就是views目錄
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')));

// app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(expressValidator());
app.use(
  session({
    secret: "youarehash", // 加密字串: 會與原密碼組合成新的字串, 在進行加密
    resave: false,
    saveUninitialized: true // session默認直接分配給你一個加密過的key,
    // false: server 真的存資料到 session時, 才分配cookie key
  })
);

app.use(router);

app.use((req, res) => {
    res.send('404 Not found...');
});

app.use((err, req, res, next) => {
    res.status(500).json({
        err_code: 500,
        message: err.message
    });
});

app.listen(port, () => console.log('server is running at port 3000...'));