import { useState } from "react";
import axios from "axios";

export default function AddEventModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [poster, setPoster] = useState(null);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setMsgType("");

    if (!title || !desc || !date || !venue || !poster) {
      setMsgType("error");
      setMsg("Please fill all fields and select a poster image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("date", date);
    formData.append("venue", venue);
    formData.append("poster", poster);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/v1/events/add",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMsgType("success");
      setMsg(res.data.message || "Event added successfully");
      setTimeout(() => onClose(), 800);
    } catch (err) {
      console.error(err);
      setMsgType("error");
      setMsg(
        err.response?.data?.error || "Failed to add event. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Add New Event</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Enter event description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter venue (e.g. Main Auditorium)"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPoster(e.target.files[0])}
          />

          <div className={`modal-msg ${msgType}`}>{msg}</div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding..." : "Submit"}
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
