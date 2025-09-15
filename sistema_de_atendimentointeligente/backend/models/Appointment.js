const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorName: { type: String },
  date: { type: Date, required: true },
  durationMinutes: { type: Number, default: 30 },
  status: { type: String, enum: ['scheduled','cancelled','completed'], default: 'scheduled' },
  address: {
    cep: String, street: String, city: String, state: String
  },
  weatherAlert: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Appointment', appointmentSchema);
