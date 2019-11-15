/*jshint esversion: 6 */
import Member from "../../models/member";
import Bcrypt from "bcrypt";
import Crypto from "crypto";
import NodeMailer from "nodemailer";
import { body, validationResult } from "../../node_modules/express-validator/check";

exports.validator = (method) => {
  switch (method){
    case 'createAccount': {
      return [
        body('email', 'Invalid email').exists().isEmail(),
        body('password', 'Invalid email').isLength({min: 8}),
        body('gender').optional({ checkFalsy: true }),
        body('phone').isInt(),
        body('name').isLength({min: 1})
      ];
    }
  }
};

exports.createAccount = async (req, res, next) => {
  try{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.status(422).json({
        code: 422,
        errors: errors.array()
      });
      return;
    }
    
    const { email, password, gender, phone, name } = req.body;
    const bcryptPassword = Bcrypt.hashSync(password, 10);
    console.log("bcryptPassword", bcryptPassword);
    const member = await Member.create({
      email,
      password: bcryptPassword,
      gender,
      phpne,
      name
    });
    res.json(member);
  } catch(err) {
    return next(err);
  }
};

// exports.createAccount = (req, res, next) => {
//   console.log("post 註冊!");
//   console.log("req", req.body);
//   const body = req.body;
//   const { email, password } = req.body;
//   Member.findOne({ email: email }, (err, data) => {
//     if (err) next(err);
//     console.log("register data", data);
//     if (data) {
//       return res.status(201).json({
//         code: 201,
//         message: "Email is already exists."
//       });
//     }

//     body.password = Bcrypt.hashSync(password, 10);
//     console.log("body.password", body.password);
//     new Member(body).save((err, member) => {
//       console.log("member", member);
//       if (err) next(err);
//       req.session.member = member;
//       console.log("req.session.member", req.session.member);
//       res.status(200).json({
//         code: 200,
//         message: "OK"
//       });
//     });
//   });
// };

exports.logIn = (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  Member.findOne({ email: email }, (err, member) => {
    if (err) next(err);
    if (!member) {
      res.status(401).json({
        code: 401,
        message: "This Email is invalid."
      });
    }
    console.log(333, member);
    Bcrypt.compare(password, member.password, (err, result) => {
      if (err) next(err);
      console.log("result", result);
      if (result) {
        res.status(200).json({
          err_code: 200,
          message: "log in suceesfully"
        });
        req.session.member = member;
      } else {
        res.status(401).json({
          code: 401,
          message: "Password is worng."
        });
      }
    });
  });
};

async function createMail(email, token) {
  let transporter = NodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "gourmand369@gmail.com", // generated ethereal user
      pass: "ao3g6ru8" // generated ethereal password
    }
  });

  await transporter.sendMail({
    from: "gourmand369@gmail.com", // sender address
    to: email, // list of receivers
    subject: "forget password", // Subject line
    text: "forget password email", // plain text body
    html: `<h3>請至連結更改密碼 : <a href="http://10.30.3.137:3000/modifiedpassword?token=${token}">修改密碼</a></h3>` // html body
  });
}

function createTokenAndSaveDB(email, next) {
  console.log(333, "email", email);
  let buffer = Crypto.randomBytes(32);
  let time = new Date();
  Member.findOne({ email: email }, (err, data) => {
    if (err) next(err);
    console.log("data", data);
    data.token = buffer.toString("hex");
    data.create_token_time = time;
    data.modified_time = time;
    Member(data).save((err, member) => {
      if (err) next(err);
      console.log("member", member);
    });
    createMail(data.email, data.token).catch(console.error);
  });
}

exports.forgotPassword = (req, res, next) => {
  const { email } = req.body;
  console.log("email", email);
  createTokenAndSaveDB(email, next);
  res.send(
    "<h1>forgot password, we are sent a validation code with your email. please check your email.</h1>"
  );
};

exports.modifiedPasswordGET = (req, res, next) => {
  console.log("req.query", req.query);
  const { token } = req.query;
  let now = new Date();
  Member.findOne({ token: token }, (err, data) => {
    if (err) next(err);
    console.log("now", typeof now, now.getTime());
    let maturityTime = data.create_token_time.getTime() + 600000;
    console.log("maturityTime", typeof maturityTime, maturityTime);
    if (now.getTime() < maturityTime) {
      res
        .status(200)
        .send(
          "<h1>this is modified password page, 記得要把使用者的帳號render出來!!</h1>"
        );
    } else {
      createTokenAndSaveDB(data.email);
      res.send("<h1>您的驗證已過期, 麻煩您點選底下的連結重新獲得驗證碼。</h1>");
    }
  });
};

exports.modifiedPasswordPOST = (req, res, next) => {
  const { email, password } = req.body;
  Member.findOne({ email: email }, (err, data) => {
    if (err) next(err);
    data.password = Bcrypt.hashSync(password, 10);
    Member(data).save((err, member) => {
      if (err) next(err);
      console.log("modified member data", member);
      res.status(200).json({
        code: 200,
        message: "save the modified."
      });
    });
  });
};
