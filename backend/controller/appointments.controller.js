const Appointment = require("../models/appointment");

const allowedSlots = ["10AM", "11AM", "12PM", "4PM", "5PM"];

// Helper: normalize date to midnight local time
function normalizeDate(dateInput) {
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return null;
  d.setHours(0, 0, 0, 0);
  return d;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
    // Check duplicate by same name on the same date
    if (fullName && fullName.trim() !== "") {
      const nameRegex = new RegExp(`^${escapeRegex(fullName.trim())}$`, "i");
      const sameName = await Appointment.findOne({
        date: normalizedDate,
        fullName: nameRegex,
      });
      if (sameName) {
        return res
          .status(400)
          .json({ message: "You already have an appointment on this date." });
      }
    }

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
