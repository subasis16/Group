import React, { useEffect, useState } from "react";
import { GraduationCap, Search, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ onSearch, onOpenModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // helper to check active link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo = go to Home (/) */}
        <div className="logo">
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <GraduationCap size={28} />
            <div>
              <span>Campus</span>
              <span className="white">Log</span>
            </div>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="nav-links">
          <Link
            to="/reviews"
            className={isActive("/reviews") ? "active" : ""}
          >
            Reviews
          </Link>

          <Link
            to="/universities"
            className={isActive("/universities") ? "active" : ""}
          >
            Universities
          </Link>
        </div>

        {/* Search + Log button */}
        <div className="nav-actions">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search colleges..."
              onChange={(e) => onSearch(e.target.value)}
            />
            <Search size={16} />
          </div>
          <button className="btn-primary" onClick={onOpenModal}>
            <Plus size={14} />
            Log
          </button>
        </div>
      </div>
    </nav>
  );
}

