import React from "react";
import logo from "../assets/logo.png"; // Ajusta la ruta de tu logo
import "./styles.css";

export default function Header() {
  return (
    <header className="header-container">
      <div className="header-content">
        {/* Logo a la izquierda */}
        <img src={logo} alt="Logo" className="header-logo" />

        {/* Texto del header */}
        <h1 className="header-title">Men In Blue</h1>
      </div>
    </header>
  );
}
