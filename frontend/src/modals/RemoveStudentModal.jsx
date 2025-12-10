import { useState } from "react";
import axios from "axios";

export default function RemoveStudentModal({ onClose, onSuccess, students }) {
  const [studentId, setStudentId] = useState(
    students && students.length > 0 ? students[0].id : ""
  );
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  if (!students || students.length === 0) {
    return (
      <div className="modal-overlay">
        <div className="modal-box">
          <h3>Remove Student</h3>
          <p>No students available to remove.</p>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  const handleRemove = async (e) => {
    e.preventDefault();
    setMsg("");
    setMsgType("");

    if (!studentId) {
      setMsgType("error");
      setMsg("Please select a student.");
      return;
    }

    const selected = students.find(
      (s) => s.id === studentId || String(s.id) === String(studentId)
    );

    const ok = window.confirm(
      `All offers related to ${selected?.name} (${selected?.roll_no}) will also be deleted. Continue?`
    );
    if (!ok) return;

    try {
      setLoading(true);
      const res = await axios.delete(
        "http://localhost:5000/api/v1/placements/students/remove",
        {
          withCredentials: true,
          data: { student_id: studentId },
        }
      );

      setMsgType("success");
      setMsg(res.data.message || "Student removed");

      if (onSuccess) onSuccess();
      setTimeout(() => onClose(), 900);
    } catch (err) {
      console.error(err);
      setMsgType("error");
      setMsg(
        err.response?.data?.error || "Failed to remove student. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Remove Student</h3>

        <form onSubmit={handleRemove}>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.roll_no}
              </option>
            ))}
          </select>

          <small>
            Note: All offers related to this student will also be deleted.
          </small>

          <div className={`modal-msg ${msgType}`}>{msg}</div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Removing..." : "Remove Student"}
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
