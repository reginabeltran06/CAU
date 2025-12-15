import React from "react";

export default function PersonCard({ person, onClick }) {
  return (
    <div className="col-md-3 mb-4">
      <div
        className="card h-100 text-center shadow-sm"
        style={{ cursor: "pointer" }}
        onClick={() => onClick(person)}
      >
        <div
            className="card-img-top d-flex align-items-center justify-content-center"
            style={{
                height: "180px",
                backgroundColor: "#f0f0f0", // el color que quieras
            }}
      >

          {person.foto ? (
            <img
              src={person.foto}
              alt={person.nombre}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "#ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                color: "#555",
              }}
            >
              {person.nombre
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          )}
        </div>

        <div className="card-body">
          <h6 className="card-title">{person.nombre}</h6>
        </div>
      </div>
    </div>
  );
}
