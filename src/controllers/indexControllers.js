/*jshint esversion: 6 */

import Restaurant from "../../models/restaurant";
import Category from "../../models/category";
import { async } from "rxjs/internal/scheduler/async";

const randomRenderRestaurant = async (req, res, next) => {
  let kindDistinct = await distinctCategory("kind");
  await Restaurant.find((err, data) => {
    if (err) next(err);
    // console.log("data", data);
    res.status(200).json({
      code: 200,
      message: "OK",
      randomRestaurants: data,
      distinctByKind: kindDistinct
    });
  }).limit(10);
};

const distinctCategory = async keyWord => {
  const kindDistinct = await Category.distinct(keyWord);
  return kindDistinct;
};

module.exports = { randomRenderRestaurant, distinctCategory };
