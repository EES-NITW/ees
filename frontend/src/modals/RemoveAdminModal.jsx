import { useState, useEffect } from "react";
import axios from "axios";

export default function RemoveAdminModal({ onClose, onSuccess, admins }) {
  const [password, setPassword] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (admins && admins.length > 0) {
      setSelectedEmail(admins[0].email);
    }
  }, [admins]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setMsgType("");

    if (!password || !selectedEmail) {
      setMsgType("error");
      setMsg("Please select admin and enter password.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/v1/settings/remove-admin",
        { password, email: selectedEmail },
        { withCredentials: true }
      );

      setMsgType("success");
      setMsg(res.data.message || "Admin removed successfully");

      if (onSuccess) onSuccess();

      setTimeout(() => onClose(), 900);
    } catch (err) {
      console.error(err);
      setMsgType("error");
      setMsg(
        err.response?.data?.error || "Failed to remove admin. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!admins || admins.length === 0) {
    return (
      <div className="modal-overlay">
        <div className="modal-box">
          <h3>Remove Admin</h3>
          <p>No admins available to remove.</p>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Remove Admin</h3>

        <form onSubmit={handleSubmit}>
          <select
            value={selectedEmail}
            onChange={(e) => setSelectedEmail(e.target.value)}
          >
            {admins.map((a) => (
              <option key={a.id} value={a.email}>
                {a.name} — {a.email}
              </option>
            ))}
          </select>

          <input
            type="password"
            placeholder="Enter settings password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className={`modal-msg ${msgType}`}>{msg}</div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Processing..." : "Remove Admin"}
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
