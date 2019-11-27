/*jshint esversion: 6 */

import Order from "../../models/order";
import Member from "../../models/member";
import Restaurant from "../../models/restaurant";
import MyEmail from "../mailPassword";
import NodeMailer from "nodemailer";

async function sendCompletedMail(email, orderId) {
    console.log(1, MyEmail);
    console.log(2, orderId);
    console.log(3, email);
    let transporter = NodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: MyEmail.email, // generated ethereal user
        pass: MyEmail.password // generated ethereal password
      }
    });
  
    await transporter.sendMail({
      from: MyEmail.email, // sender address
      to: email, // list of receivers
      subject: `Completed Mail`, // Subject line
      text: "This is your completed email", // plain text body
      html: `This is your completed email. <br> you can checked your order here <a href='/orderdetails/${orderId}'>check your order</a>` // html body
    });
  }

const createOrder = async (req, res, next) => {
    try{
        const { date, time, adult, children, nots, restaurant_name } = req.body;
        console.log('-------req.session', req.session.member);
        let dateTime = new Date(`${date} ${time}`);
        if(!req.session.isLogIn) {
            console.log('Not log in..');
            return res.redirect('/login');
        }
        const member = await Member.findOne({name: req.session.member}, {_id: 1, email: 1});
        console.log(888, member.email);
        const restaurantID = await Restaurant.findOne({name: restaurant_name},{_id: 1});
        if(member && restaurantID) {
            const order = await Order.create({
                dateTime,
                adult,
                children,
                nots,
                restaurant_id: restaurantID._id,
                member_id: member._id
            });
            console.log('order', order);
            sendCompletedMail(member.email, order._id);
            res.redirect('/completed');
        }else {
            errObj(res,'500','memberID or restaurantID is null');
        }
    }
    catch (err){
        return next(err);
    }
};

const findOrders = async (req, res, next) => {
    try{
        if(req.session.isLogIn){
            const memberID = await Member.findOne({name: req.session.member}, {_id: 1});
            console.log('memberID', memberID);
            const orders = await Order.find({member_id: memberID._id}).sort({dateTime: 1});
            res.json(orders);
        } else {
            console.log('Not log in...');
            res.redirect('/login');
        }
    }
    catch (err){
        return next(err);
    }
};

const findOrderDetails = async (req, res, next) => {
    try{
        if(req.session.isLogIn){
            console.log(999, req.params.order_id);
            const memberID = await Member.findOne({name: req.session.member}, {_id: 1});
            const orderDetails = await Order.findOne({member_id: memberID._id, _id: req.params.order_id});
            console.log('find Order Details', orderDetails);
            res.json(orderDetails);
        } else {
            console.log('Not log in...');
            res.redirect('/login');
        }
    }
    catch (err){
        return next(err);
    }
};

const modifiedOrderDetails = async (req, res, next) => {
    try{
        const { order_id } = req.params;
        const { adult, children, date, time, notes } = req.body;
        let dateTime = new Date(`${date} ${time}`);
        const order = await Order.findOne({_id: order_id}).update({
            adult,
            children,
            dateTime,
            notes
        });
        console.log('order', order);
        res.json(order);
    }
    catch (err){
        return next(err);
    }
};

const errObj = (res, code, message) => {
    res.status(code).json({
        err_code: code,
        message: message
    });
}

module.exports = { createOrder, findOrders, findOrderDetails, modifiedOrderDetails };