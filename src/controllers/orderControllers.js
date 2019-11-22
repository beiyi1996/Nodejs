/*jshint esversion: 6 */

import Order from "../../models/order";
import Member from "../../models/member";
import Restaurant from "../../models/restaurant";

const createOrder = async (req, res, next) => {
    try{
        const { date, time, adult, children, nots, restaurant_name } = req.body;
        console.log('-------req.session', req.session.member);
        if(!req.session.isLogIn) {
            console.log('no log in');
            return res.redirect('/login');
        }
        const member_id = await Member.findOne({name: req.session.member}, (err, member) => {
            if(err) next(err);
            console.log('member', member._id);
            return member._id;
        });
        console.log('member_id', member_id);
        console.log('restaurant_name', restaurant_name);
        const restaurant_id = await Restaurant.findOne({name: restaurant_name}, (err, restaurant) => {
            if(err) next(err);
            console.log('restaurant', restaurant._id);
            return restaurant._id;
        });
        console.log('restaurant_id', restaurant_id);
        const order = await Order.create({
            date,
            time,
            adult,
            children,
            nots,
            restaurant_id,
            member_id
        });
        console.log('order', order);
        res.json(order);
    }
    catch (err){
        return next(err);
    }
};

module.exports = { createOrder };