/*jshint esversion: 6 */

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/booking",  { useNewUrlParser: true, useUnifiedTopology: true });

let supplierOrdersSchema = new Schema({
  useremail: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  userphone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{4}-\d{3}-\d{3}/.test(v);
      }
    }
  },
  adult: {
    type: Number,
    required: true,
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
    type: String,
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

module.exports = mongoose.model('SupplierOrders', supplierOrdersSchema);