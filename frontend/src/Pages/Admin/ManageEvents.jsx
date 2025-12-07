import { useState } from "react";
import "./ManageEvents.css";
import { FaPlusCircle, FaImages, FaTrash } from "react-icons/fa";

import AddEventModal from "../../modals/AddEventModal";
import AddPhotosModal from "../../modals/AddPhotosModal";
import DeleteEventModal from "../../modals/DeleteEventModal";

export default function ManageEvents() {
  const [addOpen, setAddOpen] = useState(false);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="manage-events-container">
      <h2 className="me-title">Manage Events</h2>

      <div className="me-buttons">
        <button className="me-btn add-btn" onClick={() => setAddOpen(true)}>
          <FaPlusCircle /> Add New Event
        </button>

        <button
          className="me-btn photos-btn"
          onClick={() => setPhotosOpen(true)}
        >
          <FaImages /> Add Photos to Event
        </button>

        <button
          className="me-btn del-btn"
          onClick={() => setDeleteOpen(true)}
        >
          <FaTrash /> Delete Event
        </button>
      </div>

      {addOpen && <AddEventModal onClose={() => setAddOpen(false)} />}
      {photosOpen && <AddPhotosModal onClose={() => setPhotosOpen(false)} />}
      {deleteOpen && <DeleteEventModal onClose={() => setDeleteOpen(false)} />}
    </div>
  );
}
