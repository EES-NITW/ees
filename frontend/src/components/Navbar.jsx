import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px" }}>
      <Link to="/">Home</Link>
      <Link to="/events">Events</Link>
      <Link to="/teams">Teams</Link>
      <Link to="/placements">Placements</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
}

export default Navbar;
