import Particlebg from "../components/Particlebg";
import { useEffect, useState } from "react";
import axios from "axios";
import CompanyCard from "../components/CompanyCard";
import "./Placements.css";

export default function Placements() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/companies", { withCredentials: true })
      .then((res) => setCompanies(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="placements-container">
    <Particlebg />
      <h1 className="placements-title">
        Explore companies offering internships and placement opportunities
      </h1>

      <div className="companies-grid">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            id={company.id}
            name={company.name}
            img={company.img_url}
          />
        ))}
      </div>
    </div>
  );
}
