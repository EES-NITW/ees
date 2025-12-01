import "./AdminLogin.css";
import Particlebg from "../components/Particlebg";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function AdminLogin() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google?state=admin"; // oauth route
  };

  return (
    <div className="admin-login-container">
        <Particlebg />
      <div className="admin-login-card">

        <h1 className="admin-login-title">Admin Portal</h1>
        <p className="admin-login-subtitle">
          Sign in to Continue as Admin
        </p>

        <button className="google-admin-login-btn" onClick={handleLogin}>
          <FcGoogle className="google-icon" />
          <span>Continue with Google</span>
          <FaLock className="lock-icon" />
        </button>

      </div>
    </div>
  );
}
