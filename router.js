/*jshint esversion: 6 */

const express = require('express');
const path = require('path');
const router = express.Router();
const Member = require('./models/member');
const bcrypt = require('bcrypt');


// 會員註冊
router.get('/register', (req, res) => {
    res.send('<h1>This is register page!</h1>');
});

router.post('/register', (req, res, next) => {
    const body = req.body;
    console.log('body', body);
    Member.findOne({
        $or:[{email: body.email, name: body.name}]
    }, (err, data) => {
        if(err) next(err);
        console.log('register data', data);
        if(data) {
            return res.status(200).json({
                err_code: 1,
                message: 'Email or nickname is already exists.'
            });
        }

        body.password = bcrypt.hashSync(body.password, 10);
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
    const body = req.body;
    Member.findOne({email: body.email}, 
        (err, member) => {
            if(err) next(err);
            if(!member){
                res.status(200).json({
                    err_code: 1,
                    message: 'This Email is invalid.'
                });
            }
            console.log(333, member);
            bcrypt.compare(body.password, member.password, (err, result) => {
                if(err) next(err);
                console.log('result', result);
                if(result){
                    res.status(200).json({
                        err_code: 200,
                        message: 'log in suceesfully'
                    });
                } else {
                    res.status(204).json({
                        err_code: 2,
                        message: 'Password is worng.'
                    });
                }
            });
    });
});



module.exports = router;