import { useState } from "react";
import axios from "axios";

export default function DeleteMemberModal({ onClose }) {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setMsg("");
    setMsgType("");

    if (!name || !rollNo) {
      setMsgType("error");
      setMsg("Please enter name and roll number.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.delete(
        "http://localhost:5000/api/v1/teams/delete",
        {
          withCredentials: true,
          data: { name, roll_no: rollNo },
        }
      );

      setMsgType("success");
      setMsg(res.data.message || "Member deleted successfully");

      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err) {
      console.error(err);
      setMsgType("error");
      setMsg(
        err.response?.data?.error || "Failed to delete member. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Delete Member</h3>

        <input
          type="text"
          placeholder="Enter full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter roll number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
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
