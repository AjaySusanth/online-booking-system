import { useState } from "react";
import { createAppointment } from "../axios";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    date: "",
    timeSlot: "",
    reason: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await createAppointment(formData);
      setMessage("Appointment booked successfully!");

      setFormData({
        fullName: "",
        phone: "",
        date: "",
        timeSlot: "",
        reason: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error booking appointment");
    }
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white p-6 rounded-xl shadow">
      {message && <p className="mb-4 text-blue-700 font-semibold">{message}</p>}

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="border p-2 rounded"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="border p-2 rounded"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          className="border p-2 rounded"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <select
          name="timeSlot"
          className="border p-2 rounded"
          value={formData.timeSlot}
          onChange={handleChange}
          required
        >
          <option value="">Select Time Slot</option>
          <option value="10AM">10 AM</option>
          <option value="11AM">11 AM</option>
          <option value="12PM">12 PM</option>
          <option value="4PM">4 PM</option>
          <option value="5PM">5 PM</option>
        </select>

        <textarea
          name="reason"
          placeholder="Reason for Visit"
          className="border p-2 rounded"
          value={formData.reason}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}
