const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    deviceId: { type: String, required: true, unique: true },
    lastLocation: {
        lat: Number,
        lng: Number,
        timestamp: Date
    },
    sms: [{
        sender: String,
        message: String,
        timestamp: Date
    }],
    calls: [{
        number: String,
        duration: Number,
        timestamp: Date
    }],
    lastActive: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Device', deviceSchema);
