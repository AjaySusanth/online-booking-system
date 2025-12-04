import axios from "axios";

// Vite exposes env vars with the VITE_ prefix via import.meta.env
const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/appointments";

const API = axios.create({
  baseURL,
});

export const createAppointment = (data) => API.post("/", data);
export const getAppointments = () => API.get("/");
export const updateAppointment = (id, data) => API.put(`/${id}`, data);
export const deleteAppointment = (id) => API.delete(`/${id}`);
export const getAvailableSlots = (date) => API.get("/available-slots", { params: { date } });
