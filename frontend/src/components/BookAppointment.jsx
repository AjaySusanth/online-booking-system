import BookingForm from "../components/BookingForm";
import { Link } from "react-router-dom";

export default function BookAppointment() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Book an Appointment
        </h2>
        <div className="flex justify-center mb-4">
          <BookingForm />
        </div>
        <div className="flex justify-center mt-4">
          <Link
            to="/appointments"
            className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            View Appointments
          </Link>
        </div>
      </div>
    </div>
  );
}
