import { useState } from "react";
import axios from "axios";

export default function AddMemberModal({ onClose }) {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [team, setTeam] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // "error" | "success"
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setMsgType("");

    if (!name || !rollNo || !team || !image) {
      setMsgType("error");
      setMsg("Please fill all required fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("roll_no", rollNo);
    formData.append("team", team);
    formData.append("linkedin", linkedin);
    formData.append("image", image);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/v1/teams/add",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMsgType("success");
      setMsg(res.data.message || "Member added successfully");

      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err) {
      console.error(err);
      setMsgType("error");
      setMsg(
        err.response?.data?.error || "Failed to add member. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Add Member</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter roll number e.g. 223713"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            required
          />

          <select
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            required
          >
            <option value="">Select team / position</option>
            <option>FAC AD</option>
            <option>TREASURER</option>
            <option>GENERAL SECRETARY</option>
            <option>SECRETARY</option>
            <option>DESIGN TEAM</option>
            <option>CONTENT TEAM</option>
            <option>PUBLICITY TEAM</option>
            <option>HOSTING TEAM</option>
            <option>LOGISTICS TEAM</option>
          </select>

          <input
            type="url"
            placeholder="Enter LinkedIn profile URL (optional)"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className={`modal-msg ${msgType}`}>
            {msg}
          </div>

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
