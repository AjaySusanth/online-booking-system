import { useEffect, useState } from "react";
import { getAppointments, deleteAppointment } from "../axios";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const fetchData = async () => {
    const res = await getAppointments();
    setAppointments(res.data);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        All Appointments
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 sm:p-3 text-left">Name</th>
              <th className="p-2 sm:p-3 text-left">Phone</th>
              <th className="p-2 sm:p-3 text-left">Date</th>
              <th className="p-2 sm:p-3 text-left">Time Slot</th>
              <th className="p-2 sm:p-3 text-left">Reason</th>
              <th className="p-2 sm:p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((a) => (
              <tr key={a._id} className="border-b">
                <td className="p-2 sm:p-3 text-sm sm:text-base">
                  {a.fullName}
                </td>
                <td className="p-2 sm:p-3 text-sm sm:text-base">{a.phone}</td>
                <td className="p-2 sm:p-3 text-sm sm:text-base">
                  {formatDate(a.date)}
                </td>
                <td className="p-2 sm:p-3 text-sm sm:text-base">
                  {a.timeSlot}
                </td>
                <td className="p-2 sm:p-3 text-sm sm:text-base">
                  <div className="max-w-xs max-h-24 overflow-auto break-words">
                    {a.reason}
                  </div>
                </td>

                <td className="p-2 sm:p-3">
                  <button
                    onClick={() => handleDelete(a._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
