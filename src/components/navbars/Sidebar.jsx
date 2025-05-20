import { useState } from "react";
import PublicationForm from "../publication/PublicationForm";
import formularioIcon from "../../assets/formulario.png"; 
import "../../pages/dashboard/dashboardPage.css";

export const Sidebar = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);

  const handlePublicationSubmit = (formData) => {
    console.log("Datos enviados de la publicación:", formData);
    alert("Publicación guardada");
    setShowForm(false);
  };

  return (
    <div className="sidebar-container">
      <img
        src={formularioIcon}
        alt="Abrir formulario"
        className="form-button"
        onClick={toggleForm}
        style={{ cursor: "pointer", width: "40px" }}
        title="Crear nueva publicación"
      />

      {showForm && (
        <div className="form-overlay">
          <PublicationForm onSubmit={handlePublicationSubmit} />
        </div>
      )}
    </div>
  );
};
