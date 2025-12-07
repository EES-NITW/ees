import { useState } from "react";
import axios from "axios";

export default function DeleteAllModal({ onClose }) {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeleteAll = async () => {
    setMsg("");
    setMsgType("");

    if (!password) {
      setMsgType("error");
      setMsg("Password is required.");
      return;
    }

    const confirmText = window.prompt(
      'Type "DELETE ALL" to confirm deleting all members.'
    );
    if (confirmText !== "DELETE ALL") {
      setMsgType("error");
      setMsg("Confirmation text mismatch. Action cancelled.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.delete(
        "http://localhost:5000/api/v1/teams/delete-all",
        {
          withCredentials: true,
          data: { password },
        }
      );

      setMsgType("success");
      setMsg(res.data.message || "All members deleted.");

      setTimeout(() => {
        onClose();
      }, 900);
    } catch (err) {
      console.error(err);
      setMsgType("error");
      setMsg(
        err.response?.data?.error || "Failed to delete all members."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Delete All Members</h3>
        <p>Enter admin password to confirm:</p>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className={`modal-msg ${msgType}`}>{msg}</div>

        <button
          className="submit-btn"
          onClick={handleDeleteAll}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Confirm Delete All"}
        </button>

        <button
          className="close-btn"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
