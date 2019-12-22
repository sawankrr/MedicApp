const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
// Define Schema
let appointmentSchema = new Schema({
  _bookingId: mongoose.Schema.Types.ObjectId,
  userId: {
    type: Schema.ObjectId, 
    ref: 'users',
    required: 'User ID is required'
  },
  doctorId: {
    type: Schema.ObjectId, 
    ref: 'users',
    required: 'Doctor ID is required'
    
  },
  dateOfAppointment: {
    type: String,
    required: 'Date of Appointment required',
  },
  timeOfAppointment: {
    type: String,
    required: 'Time of Appointment required'
  },
  currentStatus: {
    type: String,
    required: 'Status cannot be empty',
  },
  remarks: {
    type: String,
  }
  
}, {
    collection: 'patientappointment'
  });

  module.exports = mongoose.model('Book-Appointment', appointmentSchema);