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
    const { email, password } = req.body;
    console.log('body', body);
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

router.get('/forgetpassword', (req, res) => {
    const { email } = req.body;
    let transporter = nodemailer.createTransport('SMTP', {
       service: 'Gmail',
       auth: {
        user: email,
        pass: 
       }
    });
    res.send('<h1>forgot password, we are sent a validation code with your email. please check your email.</h1>');
});

module.exports = router;