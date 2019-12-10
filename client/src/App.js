import React, { useState, useEffect } from "react";
import productService from "./services/productService";

function App() {
  const [restaurant, setrestaurant] = useState(null);

  useEffect(() => {
    if (!restaurant) {
      getRestaurant();
    }
  });

  const getRestaurant = async () => {
    let res = await productService.getAll();
    console.log("app res", res);
    setrestaurant(res);
  };
  console.log('restaurant', restaurant);

  return (
    <div>
      <ul>
        {(restaurant) ? (restaurant.randomRestaurants.map(result => {
          console.log(12345, result);
          return <li>{result.name}</li>
        })): (<p>NONONO</p>)}
      </ul>
    </div>
  );
}

export default App;
