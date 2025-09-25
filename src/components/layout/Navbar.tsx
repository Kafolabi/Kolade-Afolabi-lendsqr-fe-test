import "../../styles/components/_navbar.scss";
import { FiSearch, FiBell } from "react-icons/fi";
import Logo from "../ui/Logo";

function Navbar() {
  return (
    <header className="navbar">      
      <div className="navbar__logo">
        <Logo />
      </div>

      {/* Search bar */}
      <div className="navbar__search">
        <input type="text" placeholder="Search for anything" />
        <button>
          <FiSearch size={18} />
        </button>
      </div>

      {/* Right section */}
      <div className="navbar__right">
        <a href="#" className="navbar__docs">
          Docs
        </a>
        <FiBell className="navbar__icon" />
        <div className="navbar__profile">
          <img
            src="/profile-image.png"
            alt="User avatar"
            className="navbar__avatar"
          />
          <span className="navbar__name">Adedeji</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
