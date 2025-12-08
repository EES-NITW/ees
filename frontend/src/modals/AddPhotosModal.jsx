import { useState } from "react";
import axios from "axios";

export default function AddPhotosModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setMsgType("");

    if (!title || !files || files.length === 0) {
      setMsgType("error");
      setMsg("Enter event title and select at least one photo.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/v1/events/add-photos",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMsgType("success");
      setMsg(res.data.message || "Photos added successfully");
      setTimeout(() => onClose(), 900);
    } catch (err) {
      console.error(err);
      setMsgType("error");
      setMsg(
        err.response?.data?.error || "Failed to add photos. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Add Photos to Event</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter exact event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files))}
          />

          <div className={`modal-msg ${msgType}`}>{msg}</div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Uploading..." : "Submit"}
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
