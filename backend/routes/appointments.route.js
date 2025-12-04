const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  deleteAppointment,
  getAvailableSlots,
} = require("../controller/appointments.controller");

// Create appointment
router.post("/", createAppointment);

// Read all appointments
router.get("/", getAppointments);

// Get available slots for a date
router.get("/available-slots", getAvailableSlots);

// Read single appointment
router.get("/:id", getAppointmentById);

// Delete appointment
router.delete("/:id", deleteAppointment);

module.exports = router;
