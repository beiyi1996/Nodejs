import Category from "../../models/category";

const createCategory = (req, res, next) => {
  const { area, kind } = req.body;
  Category.findOne({ area: area, kind: kind }, (err, data) => {
    if (err) next(err);
    if (data) {
      return res.status(201).json({
        code: 201,
        message: "This category is already exists."
      });
    }

    new Category(req.body).save((err, category) => {
      if (err) next(err);
      console.log("category", category);
      res.status(200).json({
        code: 200,
        message: `Create category: area -> ${area}, kind -> ${kind}`
      });
    });
  });
};

const updateCategory = (req, res, next) => {
  const { area, kind } = req.body;
  Category.findOneAndUpdate({ area: area, kind: kind }, req.body, (err, data) => {
    if (err) next(err);
    res.status(200).json({
      code: 200,
      message: `Update Category: ${area} -> ${kind}`
    });
  });
};

const deleteCategory = (req, res, next) => {
  const { area, kind } = req.body;
  Category.findOneAndDelete(
    {
      area: area,
      kind: kind
    },
    (err, data) => {
      if (err) next(err);

      console.log("delete Category", data);
      res.status(200).json({
        code: 200,
        message: `Delete Category: ${area} -> ${kind}`
      });
      console.log("delete end..");
    }
  );
};

const distinctCategoryByArea = (req, res, next) => {
  const areaDistinct = Category.distinct("area");
  console.log("areaDistinct", areaDistinct);
  res.status(200).json({
    code: 200,
    message: "OK",
    distinctByArea: areaDistinct
  });
};

module.exports = { createCategory, updateCategory, deleteCategory, distinctCategoryByArea };
