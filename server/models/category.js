/*jshint esversion: 6 */

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let categorySchema = new Schema({
  area: {
    type: String,
    required: true
  },
  kind: {
    type: String,
    required: true
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

module.exports = mongoose.model("Category", categorySchema);
