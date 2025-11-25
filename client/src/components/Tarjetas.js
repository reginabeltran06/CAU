import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Tarjetas.css";

const socket = io(process.env.REACT_APP_API_URL);

const Tarjetas = () => {
  const [personal, setPersonal] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPersonal = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/personal`)

        const data = await res.json();
        setPersonal(data);
      } catch (err) {
        console.error("Error fetching personal:", err);
      }
    };
    fetchPersonal();

    socket.on("update", fetchPersonal);
    return () => socket.off("update");
  }, []);

  const abrirOffcanvas = (persona) => {
    setSelected(persona);
    setOpen(true);
  };

  const cerrarOffcanvas = () => {
    setOpen(false);
    setTimeout(() => setSelected(null), 300);
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-content">
          <img
            src="/up-logo.png"
            alt="Universidad Panamericana"
            className="header-logo"
          />
          <h1 className="header-title">Men In Blue</h1>
        </div>
      </header>

      {/* CONTENIDO */}
      <div className="page-container">
        <div className="grid-cards">
          {personal.map((persona) => (
            <div
              key={persona._id}
              className="card"
              onClick={() => abrirOffcanvas(persona)}
            >
              <img
                src={persona.foto || "/placeholder-avatar.png"}
                alt={persona.nombre}
                className="card-img"
              />

              <h2 className="card-name">{persona.nombre}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* OVERLAY */}
      <div
        className={`offcanvas-overlay ${open ? "show" : ""}`}
        onClick={cerrarOffcanvas}
      />

      {/* OFFCANVAS */}
      <aside className={`offcanvas ${open ? "open" : ""}`} aria-hidden={!open}>
        {selected && (
          <div className="offcanvas-content">
            <button className="close-btn" onClick={cerrarOffcanvas} aria-label="Cerrar">
              ×
            </button>

            <img
              src={selected.foto || "/placeholder-avatar.png"}
              alt={selected.nombre}
              className="offcanvas-img"
            />

            <h2 className="offcanvas-name">{selected.nombre}</h2>

            <div className="offcanvas-details">
              <p><strong>Fecha de nacimiento:</strong> {selected.fechaNacimiento ? new Date(selected.fechaNacimiento).toLocaleDateString() : "-"}</p>
              <p><strong>Teléfono:</strong> {selected.telefono || "-"}</p>
              <p><strong>Correo:</strong> {selected.correo || "-"}</p>
              <p><strong>Fecha ingreso:</strong> {selected.fechaIngreso ? new Date(selected.fechaIngreso).toLocaleDateString() : "-"}</p>
              <p><strong>Casado:</strong> {selected.casado ? "Sí" : "No"}</p>
              <p><strong>Hijos:</strong> {selected.hijos != null ? selected.hijos : "0"}</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Tarjetas;
