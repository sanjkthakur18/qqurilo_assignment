const mongoose = require('mongoose');

var addCampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    bidValue: {
        type: Number,
        required: true
    },
    img: [{
        type: String,
        required: true
    }],
    adUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('AddCampaign', addCampSchema);