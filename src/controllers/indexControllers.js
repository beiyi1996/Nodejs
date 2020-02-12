import Restaurant from "../../models/restaurant";
import Category from "../../models/category";

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

const getAllCategory = async (req, res, next) => {
  const allArea = await Category.distinct("area");
  const allKind = await Category.distinct("kind");
  res.status(200).json({
    code: 200,
    all_category: {
      allArea,
      allKind
    }
  });
};

module.exports = { randomRenderRestaurant, distinctCategory, getAllCategory };
