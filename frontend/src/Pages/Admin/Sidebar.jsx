import { useState } from "react";
import { NavLink } from "react-router-dom";

import { MdSpaceDashboard, MdGroups, MdEvent, MdBusinessCenter } from "react-icons/md";
import { FiLogOut, FiChevronsLeft, FiSettings } from "react-icons/fi";

import "./Sidebar.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <nav className="menu">
        <NavLink to="/admin/dashboard" className="menu-item">
          <MdSpaceDashboard /> {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/admin/teams" className="menu-item">
          <MdGroups /> {!collapsed && <span>Manage Teams</span>}
        </NavLink>

        <NavLink to="/admin/events" className="menu-item">
          <MdEvent /> {!collapsed && <span>Manage Events</span>}
        </NavLink>

        <NavLink to="/admin/placements" className="menu-item">
          <MdBusinessCenter /> {!collapsed && <span>Manage Placements</span>}
        </NavLink>

        <NavLink to="/admin/settings" className="menu-item">
          <FiSettings /> {!collapsed && <span>Settings</span>}
        </NavLink>

      </nav>

      <div className="bottom-controls">
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          <FiChevronsLeft className={collapsed ? "rotate" : ""} />
          {!collapsed && <span>Collapse Sidebar</span>}
        </button>

        <button className="logout-btn">
          <FiLogOut />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
