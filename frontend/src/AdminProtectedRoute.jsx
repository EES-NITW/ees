import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/check-admin", {
        withCredentials: true,
      })
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return null; 
  if (!auth) return <Navigate to="/admin" replace />;

  return children;
}
