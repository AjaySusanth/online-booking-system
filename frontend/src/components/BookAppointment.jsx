import BookingForm from "../components/BookingForm";

export default function BookAppointment() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Book an Appointment
        </h2>
        <div className="flex justify-center">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
