/*jshint esversion: 6 */

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/booking", { useMongoClient: true });

let memberSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{4}-\d{3}-\d{3}/.test(v);
      }
    }
  },
  gender: {
    type: Number,
    enum: [0, 1],
    default: 0
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

module.exports = mongoose.model('Member', memberSchema);