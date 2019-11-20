/*jshint esversion: 6 */

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/booking",  { useNewUrlParser: true, useUnifiedTopology: true });

let restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        area: {
            type: String,
            required: true
        },
        kind: {
            type: String,
            required: true
        }
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    info: {
        type: String
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

module.exports = mongoose.model('Restaurant', restaurantSchema);