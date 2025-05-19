// src/components/layout/Sidebar.jsx
import { useState } from "react";
import PublicationForm from "../publication/PublicationForm";
import "../../pages/dashboard/dashboardPage.css";

export const Sidebar = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handlePublicationSubmit = (formData) => {
    console.log("Datos enviados de la publicación:", formData);

    alert("Publicación guardada");
    setShowForm(false);
  };

  return (
    <div className="sidebar-container">
      <button onClick={toggleForm} className="create-publication-button">
        <img src="/src/assets/formulario.png" alt="formulario.png"  className="form-button"/>
      </button>

      {showForm && <PublicationForm onSubmit={handlePublicationSubmit} />}
    </div>
  );
};
