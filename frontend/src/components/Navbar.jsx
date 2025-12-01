import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="https://res.cloudinary.com/dgg1buxnp/image/upload/v1764615974/EEA_LOGOwhite_ebc2eh.png" alt="logo" className="nav-logo" />
        <span className="nav-title">Electrical Engineering Society</span>
      </div>

      <div className="navbar-links">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/events" className="nav-link">Events</NavLink>
        <NavLink to="/teams" className="nav-link">Teams</NavLink>
        <NavLink to="/databank" className="nav-link">Databank</NavLink>
        <NavLink to="/placements" className="nav-link">Placements</NavLink>
        <NavLink to="/admin" className="nav-link">Admin</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;

