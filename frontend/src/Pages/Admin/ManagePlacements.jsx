import { useEffect, useState } from "react";
import "./ManagePlacements.css";
import axios from "axios";
import { FaBuilding, FaUserGraduate, FaPlusCircle, FaTrash } from "react-icons/fa";

import AddCompanyModal from "../../modals/AddCompanyModal";
import RemoveCompanyModal from "../../modals/RemoveCompanyModal";
import AddStudentModal from "../../modals/AddStudentModal";
import RemoveStudentModal from "../../modals/RemoveStudentModal";
import AddOfferModal from "../../modals/AddOfferModal";
import RemoveOfferModal from "../../modals/RemoveOfferModal";

export default function ManagePlacements() {
  const [companies, setCompanies] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [addCompanyOpen, setAddCompanyOpen] = useState(false);
  const [removeCompanyOpen, setRemoveCompanyOpen] = useState(false);
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [removeStudentOpen, setRemoveStudentOpen] = useState(false);
  const [addOfferOpen, setAddOfferOpen] = useState(false);
  const [removeOfferOpen, setRemoveOfferOpen] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [compRes, stuRes] = await Promise.all([
        axios.get("http://localhost:5000/api/v1/placements/companies", {
          withCredentials: true,
        }),
        axios.get("http://localhost:5000/api/v1/placements/students", {
          withCredentials: true,
        }),
      ]);

      setCompanies(compRes.data || []);
      setStudents(stuRes.data || []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          "Failed to load companies/students. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="mp-container">
      <h2 className="mp-title">Manage Placements</h2>

      {loading && <div className="mp-info">Loading data...</div>}
      {!loading && error && <div className="mp-info mp-error">{error}</div>}

      <div className="mp-buttons-grid">
        <button
          className="mp-btn add-company"
          onClick={() => setAddCompanyOpen(true)}
        >
          <FaBuilding /> Add Company
        </button>

        <button
          className="mp-btn remove-company"
          onClick={() => setRemoveCompanyOpen(true)}
        >
          <FaTrash /> Remove Company
        </button>

        <button
          className="mp-btn add-student"
          onClick={() => setAddStudentOpen(true)}
        >
          <FaUserGraduate /> Add Student
        </button>

        <button
          className="mp-btn remove-student"
          onClick={() => setRemoveStudentOpen(true)}
        >
          <FaTrash /> Remove Student
        </button>

        <button
          className="mp-btn add-offer"
          onClick={() => setAddOfferOpen(true)}
        >
          <FaPlusCircle /> Add Offer
        </button>

        <button
          className="mp-btn remove-offer"
          onClick={() => setRemoveOfferOpen(true)}
        >
          <FaTrash /> Remove Offer
        </button>
      </div>

      {addCompanyOpen && (
        <AddCompanyModal
          onClose={() => setAddCompanyOpen(false)}
          onSuccess={handleRefresh}
        />
      )}

      {removeCompanyOpen && (
        <RemoveCompanyModal
          onClose={() => setRemoveCompanyOpen(false)}
          onSuccess={handleRefresh}
          companies={companies}
        />
      )}

      {addStudentOpen && (
        <AddStudentModal
          onClose={() => setAddStudentOpen(false)}
          onSuccess={handleRefresh}
        />
      )}

      {removeStudentOpen && (
        <RemoveStudentModal
          onClose={() => setRemoveStudentOpen(false)}
          onSuccess={handleRefresh}
          students={students}
        />
      )}

      {addOfferOpen && (
        <AddOfferModal
          onClose={() => setAddOfferOpen(false)}
          onSuccess={handleRefresh}
          companies={companies}
          students={students}
        />
      )}

      {removeOfferOpen && (
        <RemoveOfferModal
          onClose={() => setRemoveOfferOpen(false)}
          onSuccess={handleRefresh}
          companies={companies}
          students={students}
        />
      )}
    </div>
  );
}
