const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let orderSchema = new Schema({
  restaurant_id: {
    type: String,
    required: true
  },
  member_id: {
    type: String,
    required: true
  },
  adult: {
    type: Number,
    required: true
  },
  children: {
    type: Number,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    required: true,
    enum: ["Confirmed", "Cancelled"],
    default: "Confirmed"
  },
  create_time: {
    type: Date,
    default: Date.now
  },
  modified_time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
