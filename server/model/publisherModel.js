const mongoose = require('mongoose');

var publisherSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    ads: [{
        adId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AddCampaign'
        },
        zoneId: {
            type: String,
        },
        siteId: {
            type: String,
        },
        watchCount: {
            type: Number,
            default: 0
        },
        userIps: [{
            type: String
        }]
    }],
    sites: [{
        type: String,
        required: true
    }],
    zones: [{
        type: String,
        required: true
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Pubsliher', publisherSchema);