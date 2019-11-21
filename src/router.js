/*jshint esversion: 6 */

import express from "express";
import path from "path";
import MemberController from "./controllers/memberControllers";
import RestaurantController from "./controllers/restaurantControllers";
import IndexController from "./controllers/indexControllers";
import OrderController from "./controllers/orderControllers";
import Validator from "./validator";

const router = express.Router();
// 會員註冊
router.get("/register", (req, res) => {
  res.send("<h1>This is register page!</h1>");
});

router.post("/register", Validator.memberValidator('createAccount'), MemberController.createAccount);

// 會員登入
router.get("/login", (req, res) => {
  res.send("<h1>This is LogIn page!</h1>");
});

router.post("/login", Validator.memberValidator('login'), MemberController.logIn);

// 忘記密碼
router.post("/forgotpassword", Validator.memberValidator('forgotPassword'), MemberController.forgotPassword);

//修改密碼
router.get("/modifiedpassword", MemberController.modifiedPasswordGET);

router.post("/modifiedpassword", MemberController.modifiedPasswordPOST);

// 加入餐廳資料
router.post("/insertrestaurantdata", RestaurantController.createRestaurantData);

// 更新餐廳資料
router.post("/updaterestaurantdata", RestaurantController.updateRestaurantData);

// 刪除資料
router.post("/deleterestaurantdata", RestaurantController.deleteRestaurantData);

// 搜尋餐廳
router.post("/search", RestaurantController.searchRestaurant);

// 首頁
router.get("/", IndexController.randomRenderRestaurant);

// 產品介紹頁
router.get("/search/:name/:_id", RestaurantController.getRestaurantDetail);

// 訂購產品頁
router.get("/booking", (req, res) => {
  res.send("<h1>this is booking page</h1>");
});

router.post("/booking", OrderController.createOrder);

module.exports = router;
