/*jshint esversion: 6 */

const express = require('express');
const path = require('path');
const router = express.Router();
const Member = require('./models/member');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// 會員註冊
router.get('/register', (req, res) => {
    res.send('<h1>This is register page!</h1>');
});

router.post('/register', (req, res, next) => {
    console.log('post 註冊!!');
    console.log('req', req.body);
    const body = req.body;
    const { email, password } = req.body;
    Member.findOne({email: email}, (err, data) => {
        if(err) next(err);
        console.log('register data', data);
        if(data) {
            return res.status(201).json({
                err_code: 201,
                message: 'Email is already exists.'
            });
        }

        body.password = bcrypt.hashSync(password, 10);
        console.log('body.password', body.password);
        new Member(body).save((err, member)=>{
            console.log('member', member);
            if(err) next(err);
            req.session.member = member;
            console.log('req.session.member', req.session.member);
            res.status(200).json({
                err_code: 200,
                message: 'OK'
            });
        });
        console.log('save!');
    });
});



// 會員登入
router.get('/login', (req, res) => {
    res.send('<h1>This is LogIn page!</h1>');
});

router.post('/login', (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    Member.findOne({email: email}, 
        (err, member) => {
            if(err) next(err);
            if(!member){
                res.status(401).json({
                    err_code: 401,
                    message: 'This Email is invalid.'
                });
            }
            console.log(333, member);
            bcrypt.compare(password, member.password, (err, result) => {
                if(err) next(err);
                console.log('result', result);
                if(result){
                    res.status(200).json({
                        err_code: 200,
                        message: 'log in suceesfully'
                    });
                    req.session.member = member;
                } else {
                    res.status(401).json({
                        err_code: 401,
                        message: 'Password is worng.'
                    });
                }
            });
    });
});

async function createMail(email){
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'gourmand369@gmail.com', // generated ethereal user
            pass: 'ao3g6ru8' // generated ethereal password
        }
    });

    await transporter.sendMail({
        from: 'gourmand369@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'forget password', // Subject line
        text: 'forget password email', // plain text body
        html: `<h3>請至連結更改密碼 : <a href="http://10.30.3.137:3000/modifiedpassword">修改密碼</a></h3>` // html body
    });
}

router.get('/forgotpassword', (req, res, next) => {
    const { email } = req.body;
    console.log('email', email);
    let token = crypto.randomBytes(32, (err, buffer) => {
        if(err) next(err);
       console.log('buffer to string', buffer.toString('hex')); 
    });
    let time = new Date();
    Member.findOne({email: email}, (err, data) => {
        if(err) next(err);
        console.log('data', data);
        // data.token = token;
        // data.create_token_time = time;
        // Member(data).save((err, member) => {
        //     if(err) next(err);
        //     res.status(200).json({
        //         err_code: 200,
        //         message: 'save the token and create time.'
        //     });
        //     console.log('member', member);
        // });
    });
    createMail(email).catch(console.error);
    res.send('<h1>forgot password, we are sent a validation code with your email. please check your email.</h1>');
});

router.get('/modifiedpassword', (req, res) => {
    res.send('<h1>this is modified password page</h1>');
});

module.exports = router;