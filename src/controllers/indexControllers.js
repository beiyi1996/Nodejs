/*jshint esversion: 6 */

import Restaurant from "../../models/restaurant";

exports.randomRenderRestaurant = (req, res, next) => {
  Restaurant.find((err, data) => {
    if (err) next(err);
    console.log("data", data);
    res.status(200).json({
      code: 200,
      message: "OK",
      randomRestaurants: data
    });
  }).limit(10);
};
