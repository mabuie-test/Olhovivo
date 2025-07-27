const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  timestamp: { type: Date, required: true }
}, { _id: false });

const smsSchema = new Schema({
  sender: { type: String, required: true },
  message: { type: String },
  timestamp: { type: Date, required: true }
}, { _id: false });

const callSchema = new Schema({
  number: { type: String, required: true },
  duration: { type: Number, required: true },
  timestamp: { type: Date, required: true }
}, { _id: false });

const deviceSchema = new Schema({
  deviceId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  owner: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  lastLocation: locationSchema,
  locations: [locationSchema],
  sms: [smsSchema],
  calls: [callSchema],
  deviceInfo: { type: Object },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Atualizar timestamp antes de salvar
deviceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Device', deviceSchema);
