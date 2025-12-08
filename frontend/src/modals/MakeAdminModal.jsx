import { useState } from "react";
import axios from "axios";

export default function MakeAdminModal({ onClose, onSuccess }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setMsgType("");

    if (!password || !email) {
      setMsgType("error");
      setMsg("Please enter password and email.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/v1/settings/make-admin",
        { password, email },
        { withCredentials: true }
      );

      setMsgType("success");
      setMsg(res.data.message || "Admin added successfully");

      if (onSuccess) onSuccess();

      setTimeout(() => onClose(), 800);
    } catch (err) {
      console.error(err);
      setMsgType("error");
      setMsg(
        err.response?.data?.error || "Failed to make admin. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Make Admin</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter settings password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter user's college email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className={`modal-msg ${msgType}`}>{msg}</div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Processing..." : "Make Admin"}
          </button>

          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
