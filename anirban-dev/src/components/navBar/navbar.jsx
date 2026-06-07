import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import "./navbar.css";
import Logo from "../logo/logo";
import { NAV_ITEMS } from "../../constants/navbarItems";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Logo />
        </div>

        <div className="navbar-right">
          {NAV_ITEMS.map((item, index) => (
            <button
              key={item.id}
              className={`nav-link ${index === 0 ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <FaBars />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button
          className="close-btn"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <FaTimes />
        </button>

        <div className="mobile-menu-links">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;