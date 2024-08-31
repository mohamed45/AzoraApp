import React from 'react';
import './Nav.css'; // Import the CSS file for styling
import { useAuth } from '../../context/AuthContext';

const Nav = ({ openModal }) => {
  const auth = useAuth();

  return (
    <header className="nav-header">
      {!auth.isAuthenticated ? (
        <nav>
          <button onClick={openModal} className="navBtn">
            AUTHENTICATE
          </button>
        </nav>
      ) : (
        <button onClick={(e) => {
          e.preventDefault();
          auth.logout();
        }}>
          LOGOUT
        </button>
      )}
    </header>
  );
};

export default Nav;
