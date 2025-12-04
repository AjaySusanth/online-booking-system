import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import BookAppointment from "./components/BookAppointment";
import Appointments from "./components/Appointments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
