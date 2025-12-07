import Particlebg from "../../components/Particlebg";
import Sidebar from "./Sidebar";
import "./Admin.css";
import { Outlet } from "react-router-dom";

export default function Admin() {
  return (
    <div className="admin-layout">
      <Particlebg/>
      <Sidebar />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
