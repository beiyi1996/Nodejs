/*jshint esversion: 6 */

import Order from "../../models/order";

const createOrder = (req, res, next) => {
    const { date, time, adult, children, nots, restaurant_id } = req.body;
    console.log('req.session', req.session);
};

module.exports = { createOrder };