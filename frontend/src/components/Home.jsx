import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Online Booking System</h1>

      <div className="flex gap-4">
        <Link
          to="/book"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Book Appointment
        </Link>

        <Link
          to="/appointments"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          View Appointments
        </Link>
      </div>
    </div>
  );
}
