import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Events from "./Pages/Events/Events";
import Teams from "./Pages/Teams/Teams";
import Databank from "./Pages/Databank/Databank";
import PlacementsLogin from "./Pages/Placements/PlacementsLogin";
import Placements from "./Pages/Placements/Placements";
// admin
import AdminLogin from "./Pages/Admin/AdminLogin";
import Admin from "./Pages/Admin/Admin";
import Dashboard from "./Pages/Admin/Dashboard";
import ManageTeams from "./Pages/Admin/ManageTeams";
import ManageEvents from "./Pages/Admin/ManageEvents";
import ManagePlacements from "./Pages/Admin/ManagePlacements";
import Settings from "./Pages/Admin/Settings";
//
import Navbar from "./components/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import Landing2 from "./Pages/Home/Landing_main";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing2 />} />
          <Route path="/events" element={<Events />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/databank" element={<Databank />} />
          <Route path="/placements" element={<PlacementsLogin />} />
          <Route path="/placements/dashboard" element={<ProtectedRoute><Placements /></ProtectedRoute>}/>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminProtectedRoute><Admin /></AdminProtectedRoute>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="teams" element={<ManageTeams />} />
            <Route path="events" element={<ManageEvents />} />
            <Route path="placements" element={<ManagePlacements />} />
            <Route path="settings" element={<Settings />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
