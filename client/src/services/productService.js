export default {
  getAll: async () => {
    return await fetch("http://localhost:5000/")
      .then(res => res.json())
      .catch(error => console.error("Error:", error));
  },
  register: async () => {
    return await fetch("http://localhost:5000/register")
      .then(res => res.json())
      .catch(error => console.error("Error:", error));
  },
  logIn: async () => {
    return await fetch("http://localhost:5000/login")
      .then(res => res.json())
      .catch(error => console.error("Error:", error));
  },
  logOut: async () => {
    return await fetch("http://localhost:5000/logout")
      .then(res => res.json())
      .catch(error => console.log("Error:", error));
  },
  forgotPassword: async () => {
    return await fetch("http://localhost:5000/forgotpassword")
      .then(res => res.json())
      .catch(error => console.log("Error:", error));
  },
  modifiedPassword: async () => {
    return await fetch("http://localhost:5000/modifiedpassword")
      .then(res => res.json())
      .catch(error => console.log("Error:", error));
  },
  searchByKeyWord: async searchKeyWord => {
    return await fetch(`http://localhost:5000/search?searchKeyWord=${searchKeyWord}`, { method: "POST" })
      .then(res => res.json())
      .catch(error => console.error("Error:", error));
  },
  getAllCatrgory: async () => {
    return await fetch("http://localhost:5000/getCategory")
      .then(res => res.json())
      .catch(error => console.log("Error:", error));
  },
  getRestaurantDetail: async (name, id) => {
    return await fetch(`http://localhost:5000/search/${name}/${id}`)
      .then(res => res.json())
      .catch(error => console.error("Error:", error));
  },
  booking: async () => {
    return await fetch("http://localhost:5000/booking")
      .then(res => res.json())
      .catch(error => console.log("Error:", error));
  },
  createOrder: async () => {
    return await fetch("http://localhost:5000/orders")
      .then(res => res.json())
      .catch(error => console.log("Error:", error));
  },
  getOrderDetails: async order_id => {
    return await fetch(`http://localhost:5000/orderdetails/${order_id}`)
      .then(res => res.json())
      .catch(error => console.log("Error:", error));
  },
  editOrderDetails: async order_id => {
    return await fetch(`http://localhost:5000/orderdetails/${order_id}/edit`)
      .then(res => res.json())
      .catch(error => console.log("Error:", error));
  },
  cancelModifiedOrderDetails: async order_id => {
    return await fetch(`http://localhost:5000/orderdetails/${order_id}/cancell`)
      .then(res => res.json())
      .catch(error => console.log("Error:", error));
  }
};
