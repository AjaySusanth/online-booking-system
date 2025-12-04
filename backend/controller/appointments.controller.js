const Appointment = require("../models/appointment");

const allowedSlots = ["10AM", "11AM", "12PM", "4PM", "5PM"];

// Helper: normalize date to midnight local time
function normalizeDate(dateInput) {
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return null;
  d.setHours(0, 0, 0, 0);
  return d;
}


// Create Appointment
const createAppointment = async (req, res) => {
  const { fullName, phone, date, timeSlot, reason } = req.body;

  if (!allowedSlots.includes(timeSlot)) {
    return res.status(400).json({
      message: `Invalid time slot. Allowed slots: ${allowedSlots.join(", ")}`,
    });
  }

  const normalizedDate = normalizeDate(date);
  if (!normalizedDate) {
    return res.status(400).json({ message: "Invalid date format." });
  }

  try {
    // (Removed same-name-per-day restriction)

    // Check duplicate slot
    const existing = await Appointment.findOne({
      date: normalizedDate,
      timeSlot,
    });

    if (existing) {
      return res.status(400).json({
        message: "This slot is already booked. Please choose another time.",
      });
    }

    const appointment = await Appointment.create({
      fullName,
      phone,
      date: normalizedDate,
      timeSlot,
      reason,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Appointment
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Appointment
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  deleteAppointment,
};

// Get available slots for a given date
const getAvailableSlots = async (req, res) => {
  const { date } = req.query;
  const normalizedDate = normalizeDate(date);
  if (!normalizedDate) {
    return res.status(400).json({ message: "Invalid date format." });
  }

  try {
    const booked = await Appointment.find({ date: normalizedDate }).select("timeSlot -_id");
    const bookedSet = new Set(booked.map((b) => b.timeSlot));
    const available = allowedSlots.filter((s) => !bookedSet.has(s));
    res.json(available);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// append to exports
module.exports.getAvailableSlots = getAvailableSlots;
