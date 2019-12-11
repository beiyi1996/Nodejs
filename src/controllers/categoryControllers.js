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
