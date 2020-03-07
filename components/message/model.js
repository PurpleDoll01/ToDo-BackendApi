const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    checked: Boolean,
    text: {
        type: String,
        required: true,
    },
    notes: String,
})

const model = mongoose.model('Message', mySchema);
module.exports = model;