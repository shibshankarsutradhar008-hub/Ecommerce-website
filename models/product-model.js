const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    image: {
        type: Buffer
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true
    },

    discount: {
        type: Number,
        default: 0
    },

    bgcolor: {
        type: String,
        default: "#ffffff"
    },

    panelcolor: {
        type: String,
        default: "#ffffff"
    },

    textcolor: {
        type: String,
        default: "#000000"
    }
});

module.exports = mongoose.model("product", productSchema);