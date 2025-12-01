import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/check-auth", { withCredentials: true })
      .then(() => setAuth(true))
      .catch(() => setAuth(false))
      .finally(() => setChecked(true));
  }, []);

  if (!checked) return null; 

  return auth ? children : <Navigate to="/placements" replace />;
}
