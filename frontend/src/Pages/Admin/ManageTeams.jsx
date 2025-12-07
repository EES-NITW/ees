import { useState } from "react";
import "./ManageTeams.css";
import { FaUserPlus, FaUserMinus, FaTrash } from "react-icons/fa";

import AddMemberModal from "../../modals/AddMemberModal";
import DeleteMemberModal from "../../modals/DeleteMemberModal";
import DeleteAllModal from "../../modals/DeleteAllModal";

export default function ManageTeams() {
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteAllOpen, setDeleteAllOpen] = useState(false);

  return (
    <div className="manage-teams-container">
      <h2 className="mt-title">Manage Teams</h2>

      <div className="mt-buttons">
        <button className="mt-btn add-btn" onClick={() => setAddOpen(true)}>
          <FaUserPlus /> Add Member
        </button>

        <button className="mt-btn del-btn" onClick={() => setDeleteOpen(true)}>
          <FaUserMinus /> Delete Member
        </button>

        <button
          className="mt-btn delall-btn"
          onClick={() => setDeleteAllOpen(true)}
        >
          <FaTrash /> Delete All Members
        </button>
      </div>

      {addOpen && <AddMemberModal onClose={() => setAddOpen(false)} />}
      {deleteOpen && <DeleteMemberModal onClose={() => setDeleteOpen(false)} />}
      {deleteAllOpen && (
        <DeleteAllModal onClose={() => setDeleteAllOpen(false)} />
      )}
    </div>
  );
}
