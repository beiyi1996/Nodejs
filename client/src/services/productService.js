import axios from "axios";

export default {
  getAll: async () => {
    let res = await axios("http://localhost:5000/");
    console.log("getAll res", res);
    return res.data || [];
  }
};
