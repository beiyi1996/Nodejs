/*jshint esversion: 6 */

const express = require("express");
const path = require("path");
const router = express.Router();
const MemberController = require("./controllers/memberControllers");
const RestaurantController = require("./controllers/restaurantControllers");

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

// 加入餐廳資料
router.post("/insertrestaurantdata", RestaurantController.createRestaurantData);

// 更新餐廳資料
router.post("/updaterestaurantdata", RestaurantController.updateRestaurantData);

// 刪除資料
router.post("/deleterestaurantdata", RestaurantController.deleteRestaurantData);

module.exports = router;
