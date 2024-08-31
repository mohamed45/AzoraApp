import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (location.pathname === "/auth") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [location.pathname]);

  const closeModal = () => {
    setShowModal(false);
    navigate("/"); 
  };

  const openModal = () => {
    setShowModal(true);
    navigate("/auth"); 
  };

  return (
    <div>
      <Nav openModal={openModal} />

      {showModal && (
        <Auth isModal={true} onClose={closeModal} />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} /> {/* Render Home when on auth route */}
      </Routes>
    </div>
  );
}

export default App;
