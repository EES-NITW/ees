import { useState } from "react";
import axios from "axios";

export default function AddStudentModal({ onClose, onSuccess }) {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setMsgType("");

    if (!rollNo || !name) {
      setMsgType("error");
      setMsg("Please enter roll number and name.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/v1/placements/students/add",
        { roll_no: rollNo, name, linkedin },
        { withCredentials: true }
      );

      setMsgType("success");
      setMsg(res.data.message || "Student added");

      if (onSuccess) onSuccess();
      setTimeout(() => onClose(), 900);
    } catch (err) {
      console.error(err);
      setMsgType("error");
      setMsg(
        err.response?.data?.error || "Failed to add student. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Add Student</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter roll number (e.g., 24EEB...)"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter student full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="url"
            placeholder="Enter LinkedIn URL "
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
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
