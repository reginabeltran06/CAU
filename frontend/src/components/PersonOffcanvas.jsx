import React from "react";

export default function PersonOffcanvas({ person, onClose }) {
  if (!person) return null;

  // Función para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES"); // Formato dd/mm/aaaa
  };

  return (
    <>
      {/* Fondo oscuro */}
      <div className="offcanvas-backdrop fade show" onClick={onClose} />

      {/* Offcanvas */}
      <div
        className="offcanvas offcanvas-end show"
        style={{ visibility: "visible", width: "350px" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">{person.nombre}</h5>
          <button type="button" className="btn-close" onClick={onClose} />
        </div>

        <div className="offcanvas-body">
          {/* Imagen circular centrada */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>
            <img
              src={person.foto || "https://via.placeholder.com/100"}
              alt={person.nombre}
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Texto alineado a la izquierda */}
          <p><strong>Correo:</strong> {person.correo}</p>
          <p><strong>Teléfono:</strong> {person.telefono}</p>
          <p><strong>Fecha nacimiento:</strong> {formatDate(person.fechaNacimiento)}</p>
          <p><strong>Fecha ingreso:</strong> {formatDate(person.fechaIngreso)}</p>
          <p><strong>Casado:</strong> {person.casado ? "Sí" : "No"}</p>
          <p>
            <strong>Hijos:</strong> {person.hijos.length} {person.hijos.length === 1 ? "hijo" : "hijos"}
          </p>
        </div>
      </div>
    </>
  );
}
