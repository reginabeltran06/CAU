import React from "react";
import logo from "../assets/logo.png";
import "./styles.css";

export default function Header({ search, onSearchChange }) {
  return (
    <header className="header-container">
      <div className="header-content">

        {/* BLOQUE IZQUIERDO */}
        <div className="header-left">
          <img src={logo} alt="Logo" className="header-logo" />
          <h1 className="header-title">Men In Blue</h1>
        </div>

        {/* BUSCADOR DERECHA */}
        <input
          type="text"
          className="form-control header-search"
          placeholder="Buscar por nombre o turno"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />

      </div>
    </header>
  );
}
