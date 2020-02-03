import Member from "../../models/member";
import Bcrypt from "bcryptjs";
import Crypto from "crypto";
import NodeMailer from "nodemailer";
import { validationResult } from "../../node_modules/express-validator";
import MyEmail from "../mailPassword";

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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
      phone,
      name
    });
    res.status(200).json({ code: 200, message: "register success", member });
  } catch (err) {
    console.log("error!!!");
    return next(err);
  }
};

const logIn = async (req, res, next) => {
  console.log(req.body);
  let isLogIn = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        code: 422,
        errors: errors.array()
      });
      return;
    }

    const { email, password } = req.body;
    Member.findOne(
      {
        email: email
      },
      (err, member) => {
        if (err) next(err);
        if (!member) {
          console.log("This email is unregistered");
          res.redirect("/register"); // 會員未註冊
        }
        console.log(333, member.name);
        console.log("member.password", member.password);
        console.log("body.password", Bcrypt.hashSync(password, 10));
        Bcrypt.compare(password, member.password, (err, result) => {
          console.log("result", result);
          if (result) {
            isLogIn = true;
            req.session.member = member.name;
            req.session.isLogIn = isLogIn;
            createTokenAndSaveDB(email, "login", next);
            res.status(200).json({
              code: 200,
              member: member.name,
              login: isLogIn
            });
            console.log("req.session", req.session);
          } else {
            res.status(401).json({
              code: 401,
              message: "Password is worng."
            });
          }
        });
      }
    );
  } catch (err) {
    return next(err);
  }
};

async function createMail(email, token) {
  console.log(18901394, MyEmail, token);
  let transporter = NodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    secureConnection: true, // 使用SSL方式 (安全方式，防止被竊取信息)
    auth: {
      user: MyEmail.email, // generated ethereal user
      pass: MyEmail.password // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false // 不得檢查服務器所發送的憑證
    }
  });

  await transporter.sendMail({
    from: MyEmail.email, // sender address
    to: email, // list of receivers
    subject: "forget password", // Subject line
    text: "forget password email", // plain text body
    html: `<h3>請至連結更改密碼 : <a href="http://localhost:3000/modifiedpassword?token=${token}">修改密碼</a></h3>` // html body
  });
}

function createTokenAndSaveDB(email, type, next) {
  console.log(333, "email", email);
  console.log(666, "createToken and Save db type", type);
  let buffer = Crypto.randomBytes(32);
  let time = new Date();
  Member.findOne(
    {
      email: email
    },
    (err, data) => {
      if (err) next(err);
      console.log("data", data);
      data.token = buffer.toString("hex");
      data.create_token_time = time;
      data.modified_time = time;
      Member(data).save((err, member) => {
        if (err) next(err);
        console.log(1234, "member", member);
      });

      if (type === "login") {
        return console.log("token is saved in db");
      } else {
        console.log(1233094, "else data.token", data.token);
        createMail(data.email, data.token).catch(console.error);
      }
    }
  );
}

const forgotPassword = (req, res, next) => {
  console.log("22222", req.body);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        code: 422,
        errors: errors.array()
      });
      return;
    }
    const { email } = req.body;
    console.log("email", email);
    createTokenAndSaveDB(email, "forgotPassword", next);
    res.send("<h1>forgot password, we are sent a validation code with your email. please check your email.</h1>");
  } catch (err) {
    console.log("error!");
    return next(err);
  }
};

const modifiedPasswordGET = (req, res, next) => {
  console.log("modifiedPasswordGet req.query", req.query);
  const { token } = req.query;
  let now = new Date();
  Member.findOne(
    {
      token: token
    },
    (err, data) => {
      console.log("data", data);
      if (err) next(err);
      console.log("now", typeof now, now.getTime());
      let maturityTime = data.create_token_time.getTime() + 600000;
      console.log("maturityTime", typeof maturityTime, maturityTime);
      if (now.getTime() < maturityTime) {
        res.status(200).json({
          code: 200,
          email: data.email
        });
      } else {
        createTokenAndSaveDB(data.email);
        res.send("<h1>您的驗證已過期, 麻煩您點選底下的連結重新獲得驗證碼。</h1>");
      }
    }
  );
};

const modifiedPasswordPOST = (req, res, next) => {
  console.log("Modified password post is working!!!", res.body);
  const { email, password } = req.body;
  Member.findOne(
    {
      email: email
    },
    (err, data) => {
      if (err) next(err);
      data.password = Bcrypt.hashSync(password, 10);
      data.create_time = Date.now();
      data.modified_time = Date.now();
      Member(data).save((err, member) => {
        if (err) next(err);
        console.log("modified member data", member);
        res.status(200).json({
          code: 200,
          message: "save the modified."
        });
      });
    }
  );
};

const logOut = (req, res, next) => {
  console.log("logout req.body", req.body);
  try {
    if (req.body.logInStatus) {
      req.session.destroy();
      res.status(200).json({
        code: 200,
        message: "Log out successful!"
      });
    } else {
      res.status(403).json({
        code: 403,
        message: "You are not log in!"
      });
    }
  } catch (err) {
    return next(err);
  }
};

const checkLogInStatus = (req, res, next) => {
  const { name } = req.body;
  const member = Member.findOne({ name: name }, { _id: 1, name: 1, token: 1, create_token_time: 1 });
  console.log("member", member);
  const limitTime = mwmber.create_token_time !== null ? member.create_token_time + 600000 : 0;
  if (!member.token || Date.now() > limitTime) {
    res.status(403).json({
      code: 403,
      message: "You are not log in"
    });
  } else {
    res.status(200).json({
      code: 200,
      message: "You are log in"
    });
  }
};

module.exports = {
  register,
  logIn,
  forgotPassword,
  modifiedPasswordGET,
  modifiedPasswordPOST,
  logOut,
  checkLogInStatus
};
