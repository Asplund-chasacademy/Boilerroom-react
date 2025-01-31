// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="Meny">
      <Link to="/">Hem</Link>
      <Link to="/list">Visa resor</Link>
      <Link to="/new">Skapa ny resa</Link>
    </nav>
  );
}

export default Navbar;
