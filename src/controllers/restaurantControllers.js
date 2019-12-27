/*jshint esversion: 6 */
import Restaurant from "../../models/restaurant";

const createRestaurantData = (req, res, next) => {
  const { name, address } = req.body;
  const body = req.body;
  console.log("restaurant data", req.body);
  Restaurant.findOne(
    {
      name: name,
      address: address
    },
    (err, data) => {
      if (err) next(err);
      if (data) {
        console.log(222, "if");
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
        console.log("end save..");
      });
    }
  );
};

const updateRestaurantData = (req, res, next) => {
  const { name } = req.body;
  console.log("req.body", req.body);
  Restaurant.findOneAndUpdate(
    {
      name: name
    },
    req.body,
    (err, restaurant) => {
      if (err) next(err);

      // findOneAndUpdate 回傳的是 未修改前 的資料
      console.log("update restaurant", restaurant);
      res.status(200).json({
        code: 200,
        message: `Update restaurant: ${name}`
      });
      console.log("end...");
    }
  );
};

const deleteRestaurantData = (req, res, next) => {
  const { name, address } = req.body;
  Restaurant.findOneAndDelete(
    {
      name: name,
      address: address
    },
    (err, restaurant) => {
      if (err) next(err);

      console.log("delete restaurant", restaurant);
      res.status(200).json({
        code: 200,
        message: `Delete restaurant: ${name}`
      });
      console.log("delete end..");
    }
  );
};

async function findByName(name, res, next) {
  await Restaurant.findOne(
    {
      name: name
    },
    (err, data) => {
      if (err) next(err);
      console.log("data", data);
      res.status(200).json({
        code: 200,
        message: `find restaurant by name : ${name}`,
        resaturants: data
      });
    }
  );
}

async function findByArea(area, res, next) {
  await Restaurant.find(
    {
      "category.area": area
    },
    (err, data) => {
      if (err) next(err);
      console.log("data", data);
      res.status(200).json({
        code: 200,
        message: `find restaurant by area : ${area}`,
        restaurants: data
      });
    }
  );
}

async function findByKind(kind, res, next) {
  await Restaurant.find(
    {
      "category.kind": kind
    },
    (err, data) => {
      if (err) next(err);
      console.log("data", data);
      res.status(200).json({
        code: 200,
        message: `find restaurant by kind : ${kind}`,
        restaurants: data
      });
    }
  );
}

const searchRestaurant = async (req, res, next) => {
  const { searchKeyWord } = req.query;
  // console.log("req.query", req.query);
  const searchResult = [];
  const restaurants = await Restaurant.find();
  restaurants.map(item => {
    if (item.name.indexOf(searchKeyWord) === 0) {
      searchResult.push(item);
    } else if (item.address.indexOf(searchKeyWord) === 0) {
      searchResult.push(item);
    } else if (item.category.kind.indexOf(searchKeyWord) === 0 || item.category.area.indexOf(searchKeyWord) === 0) {
      searchResult.push(item);
    } else {
      return false;
    }
  });
  // console.log("searchResult", searchResult);
  res.status(200).json({
    code: 200,
    message: `find restaurant by ${searchKeyWord} : ${searchKeyWord}`,
    restaurants: searchResult
  });
};

const getRestaurantDetail = (req, res, next) => {
  const { name, _id } = req.params;
  console.log("name", name, "_id", _id);
  Restaurant.findOne(
    {
      name: name,
      _id: _id
    },
    (err, data) => {
      if (err) next(err);
      console.log("data", data);
      res.status(200).json({
        code: 200,
        message: `find restaurant ${name}`,
        restaurant: data
      });
    }
  );
};

module.exports = {
  createRestaurantData,
  updateRestaurantData,
  deleteRestaurantData,
  searchRestaurant,
  getRestaurantDetail
};
