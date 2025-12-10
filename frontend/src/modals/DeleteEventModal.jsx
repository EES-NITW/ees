import { useState } from "react";
import axios from "axios";

export default function DeleteEventModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setMsg("");
    setMsgType("");

    if (!title) {
      setMsgType("error");
      setMsg("Please enter event title.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.delete(
        "http://localhost:5000/api/v1/events/delete",
        {
          withCredentials: true,
          data: { title },
        }
      );

      setMsgType("success");
      setMsg(res.data.message || "Event deleted successfully");
      setTimeout(() => onClose(), 900);
    } catch (err) {
      console.error(err);
      setMsgType("error");
      setMsg(
        err.response?.data?.error || "Failed to delete event. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Delete Event</h3>

        <input
          type="text"
          placeholder="Enter exact event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className={`modal-msg ${msgType}`}>{msg}</div>

        <button
          className="submit-btn"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
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
