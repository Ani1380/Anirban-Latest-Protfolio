import "./Navbar.css";
import Logo from "../Logo/Logo";
import { NAV_ITEMS } from "../../constants/navbarItems";

function Navbar() {
  return (
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
    </nav>
  );
}

export default Navbar;
