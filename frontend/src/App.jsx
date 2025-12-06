import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Events from "./Pages/Events/Events";
import Teams from "./Pages/Teams/Teams";
import DatabankLogin from "./Pages/Databank/DatabankLogin";
import Databank from "./Pages/Databank/Databank";
import PlacementsLogin from "./Pages/Placements/PlacementsLogin";
import Placements from "./Pages/Placements/Placements";
import AdminLogin from "./Pages/Admin/AdminLogin";
import Admin from "./Pages/Admin/Admin";

import Admin_events from "./Pages/Admin/Admin_events";
import Admin_placements from "./Pages/Admin/Admin_placements";
import Admin_teams from "./Pages/Admin/Admin_teams";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import Landing2 from "./Pages/Home/Landing_main";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing2 />} />
          <Route path="/events" element={<Events />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/databank" element={<Databank />} />
          <Route path="/placements" element={<PlacementsLogin />} />
          <Route
            path="/placements/dashboard"
            element={
              <ProtectedRoute>
                {" "}
                <Placements />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                {" "}
                <Admin />{" "}
              </AdminProtectedRoute>
            }
          />
          <Route path="/add_event" element={<Admin_events />} />
          <Route path="/add_placement" element={<Admin_placements />} />
          <Route path="/add_team" element={<Admin_teams />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
