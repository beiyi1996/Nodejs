/*jshint esversion: 6 */

import express from "express";
import path from "path";
import MemberController from "./controllers/memberControllers";
import RestaurantController from "./controllers/restaurantControllers";
import IndexController from "./controllers/indexControllers";
import OrderController from "./controllers/orderControllers";
import CategoryController from "./controllers/categoryControllers";
import Validator from "./validator";

const router = express.Router();
// 會員註冊
router.get("/register", (req, res) => {
  res.send("<h1>This is register page!</h1>");
});

router.post("/register", Validator.memberValidator("register"), MemberController.register);

// 會員登入
router.get("/login", (req, res) => {
  res.send("<h1>This is LogIn page!</h1>");
});

router.post("/login", Validator.memberValidator("login"), MemberController.logIn);

// 忘記密碼
router.post("/forgotpassword", Validator.memberValidator("forgotPassword"), MemberController.forgotPassword);

//修改密碼
router.get("/modifiedpassword", MemberController.modifiedPasswordGET);

router.post("/modifiedpassword", Validator.memberValidator("modifiedPassword"), MemberController.modifiedPasswordPOST);

// 會員登出
router.post("/logout", MemberController.logOut);

// 加入餐廳資料
router.post("/createrestaurantdata", RestaurantController.createRestaurantData);

// 更新餐廳資料
router.post("/updaterestaurantdata", RestaurantController.updateRestaurantData);

// 刪除資料
router.post("/deleterestaurantdata", RestaurantController.deleteRestaurantData);

router.get("/search");

// 搜尋餐廳
router.post("/search", RestaurantController.searchRestaurant);

// 首頁
router.get("/", IndexController.randomRenderRestaurant);

// 產品介紹頁
router.get("/detail", RestaurantController.getRestaurantDetail);

// 訂購產品頁
router.get("/booking", (req, res) => {
  // res.send("<h1>this is booking page</h1>");
});

// 訂位
router.post("/booking", Validator.orderValidator(), OrderController.createOrder);

// 完成頁
// router.get("/completed");

// 查看訂單
router.get("/orders", OrderController.findOrders);

// 查看訂單明細
router.get("/orderdetails", OrderController.findOrderDetails);

// 修改訂單頁
router.get("/orderdetails/:order_id/edit", (req, res) => {
  res.send("<h1>This is modified order details page!!</h1>");
});

// 確認修改訂單
router.post("/orderdetails/:order_id/edit", OrderController.modifiedOrderDetails);

// 取消訂單
router.post("/orderdetails/:order_id/cancell", OrderController.cancelledOrderDetail);

// 新增類別
router.post("/createCategory", CategoryController.createCategory);

// 更新類別
router.post("/updateCategory", CategoryController.updateCategory);

// 刪除類別
router.post("/deleteCategory", CategoryController.deleteCategory);

// 確認登入狀態
router.post("/checkLogInStatus", MemberController.checkLogInStatus);

// 取得所有類別
router.get("/getCategory", IndexController.getAllCategory);
module.exports = router;
