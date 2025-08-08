const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  location: String,
  clinicName: String,
  experience: Number, // years
  consultationFee: Number,
  rating: Number, // percentage like 97
  patientStories: Number,
  availability: String, // e.g., "Available Today"
  profileImage: String,
  gender: String,
  specialty:String,
  consultation_fee:Number,
  clinic:String,
  available_today:Boolean,
  image:String,
  created_at: String,
  updated_at: String, 
});

module.exports = mongoose.model("Doctor", DoctorSchema);
