/*jshint esversion: 6 */

import Order from "../../models/order";
import Member from "../../models/member";

const createOrder = async (req, res, next) => {
    const { date, time, adult, children, nots, restaurant_id } = req.body;
    let member_Id = "";
    console.log('-------req.session', req.session.member);
    if(!req.session.isLogIn) {
        res.redirect('/login');
    }
    Member.findOne({name: req.session.member}, (err, member) => {
        if(err) next(err);
        member_Id = member_id;
    });
    const order = await Order.create({
        date,
        time,
        adult,
        children,
        nots,
        restaurant_id
    });
    res.status(200).json({
        code: 200,
        message: 'OK'
    });
};

module.exports = { createOrder };