/*jshint esversion: 6 */

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/booking",  { useNewUrlParser: true, useUnifiedTopology: true });

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
        required: true,
    },
    children: {
        type: Number,
        required: true,
    },
    dateTime: {
        type: Date,
        required: true
    },
    notes: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: ['Open', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Open'
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

module.exports = mongoose.model('Order', orderSchema);