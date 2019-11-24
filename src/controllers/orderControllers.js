/*jshint esversion: 6 */

import Order from "../../models/order";
import Member from "../../models/member";
import Restaurant from "../../models/restaurant";
import MyEmail from "../mailPassword";
import NodeMailer from "nodemailer";

async function sendCompletedMail(email, orderId) {
    console.log(1, MyEmail);
    console.log(2, orderId);
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
      subject: `Completed Mail ${orderId}`, // Subject line
      text: "This is your completed email", // plain text body
      html: `This is your completed email, your order id is ${orderId}. <br> you can checked your order here <a href="/checkorders">check your order</a>` // html body
    });
  }

const createOrder = async (req, res, next) => {
    try{
        const { date, time, adult, children, nots, restaurant_name } = req.body;
        console.log('-------req.session', req.session.member);
        let dateTime = new Date(`${date} ${time}`);
        if(!req.session.isLogIn) {
            console.log('no log in');
            return res.redirect('/login');
        }
        const member = await Member.findOne({name: req.session.member}, {_id: 1, email: 1});
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
            await sendCompletedMail(member.email, restaurantID._id);
            res.json(order).redirect('/complated');
        }else {
            errObj(res,'500','memberID or restaurantID is null');
        }
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

module.exports = { createOrder };