const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    timeSlot: {
      type: String,
      required: true,
      enum: ["10AM", "11AM", "12PM", "4PM", "5PM"],
    },
    reason: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
