/*jshint esversion: 6 */

const express = require("express");
const path = require("path");
const router = express.Router();
const MemberController = require("./controllers/member");

// 會員註冊
router.get("/register", (req, res) => {
  res.send("<h1>This is register page!</h1>");
});

router.post("/register", MemberController.createAccount);

// 會員登入
router.get("/login", (req, res) => {
  res.send("<h1>This is LogIn page!</h1>");
});

router.post("/login", MemberController.logIn);

// 忘記密碼
router.get("/forgotpassword", MemberController.forgotPassword);

//修改密碼
router.get("/modifiedpassword", MemberController.modifiedPasswordGET);

router.post("/modifiedpassword", MemberController.modifiedPasswordPOST);

module.exports = router;
