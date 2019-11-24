/*jshint esversion: 6 */

import Order from "../../models/order";
import Member from "../../models/member";
import Restaurant from "../../models/restaurant";

const createOrder = async (req, res, next) => {
    try{
        const { date, time, adult, children, nots, restaurant_name } = req.body;
        console.log('-------req.session', req.session.member);
        let dateTime = new Date(`${date} ${time}`);
        if(!req.session.isLogIn) {
            console.log('no log in');
            return res.redirect('/login');
        }
        const memberID = await Member.findOne({name: req.session.member}, {_id: 1});
        const restaurantID = await Restaurant.findOne({name: restaurant_name},{_id: 1});
        if(memberID && restaurantID) {
            const order = await Order.create({
                dateTime,
                adult,
                children,
                nots,
                restaurant_id: restaurantID._id,
                member_id: memberID._id
            });
            res.json(order);
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