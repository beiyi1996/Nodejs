import Restaurant from "../../models/restaurant";

exports.createRestaurantData = (req, res, next) => {
  const { name, address } = req.body;
  const body = req.body;
  console.log("restaurant data", req.body);
  Restaurant.findOne({ name: name, address: address }, (err, data) => {
    if (err) next(err);
    if (data) {
      console.log(222, 'if');
      return res.status(201).json({
        code: 201,
        message: "Restaurant is already exists."
      });
    }

    new Restaurant(body).save((err, restaurant) => {
      if (err) next(err);
      console.log("restaurant", restaurant);
      res.status(200).json({
        code: 200,
        message: `Create restaurant: ${name}`
      });
      console.log('end save..');
    });
  });
};

exports.updateRestaurantData = (req, res, next) => {
  const { name } = req.body;
  console.log('req.body', req.body);
  Restaurant.findOneAndUpdate({name: name}, req.body, (err, restaurant) => {
    if(err) next(err);
    
    // findOneAndUpdate 回傳的是 未修改前 的資料
    console.log('update restaurant', restaurant);
    res.status(200).json({
      code: 200,
      message: `Update restaurant: ${name}`
    });
    console.log('end...');
  });
};

exports.deleteRestaurantData = (req, res, next) => {
  const { name, address } = req.body;
  Restaurant.findOneAndDelete({name: name, address: address}, (err, restaurant) => {
    if(err) next(err);

    console.log('delete restaurant', restaurant);
    res.status(200).json({
      code: 200,
      message: `Delete restaurant: ${name}` 
    });
    console.log('delete end..');
  });
};