import { useState, useEffect } from "react";
import { createAppointment, getAvailableSlots } from "../axios";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    date: "",
    timeSlot: "",
    reason: "",
  });

  const [message, setMessage] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // If date changed, fetch available slots
    if (name === "date") {
      setFormData((prev) => ({ ...prev, timeSlot: "" }));
      if (value) {
        setSlotsLoading(true);
        getAvailableSlots(value)
          .then((res) => setAvailableSlots(res.data || []))
          .catch(() => setAvailableSlots([]))
          .finally(() => setSlotsLoading(false));
      } else {
        setAvailableSlots([]);
      }
    }
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

        <label className="flex flex-col">
          <span className="mb-1">Time Slot</span>
          <select
            name="timeSlot"
            className="border p-2 rounded"
            value={formData.timeSlot}
            onChange={handleChange}
            required
            disabled={slotsLoading || !formData.date}
          >
            <option value="">{slotsLoading ? "Loading slots..." : "Select Time Slot"}</option>
            {availableSlots.length > 0 ? (
              availableSlots.map((s) => (
                <option key={s} value={s}>
                  {s.replace(/AM|PM/, (m) => (m === "AM" ? " AM" : " PM"))}
                </option>
              ))
            ) : (
              // if no slots returned (e.g., date not selected or none available) show full list
              ["10AM", "11AM", "12PM", "4PM", "5PM"].map((s) => (
                <option key={s} value={s}>
                  {s.replace(/AM|PM/, (m) => (m === "AM" ? " AM" : " PM"))}
                </option>
              ))
            )}
          </select>
        </label>

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
