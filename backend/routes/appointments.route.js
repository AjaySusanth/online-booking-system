const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  deleteAppointment,
} = require("../controller/appointments.controller");

// Create appointment
router.post("/", createAppointment);

// Read all appointments
router.get("/", getAppointments);

// Read single appointment
router.get("/:id", getAppointmentById);

// (Update route removed - updating appointments is not supported)

// Delete appointment
router.delete("/:id", deleteAppointment);

module.exports = router;
