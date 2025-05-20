import { useNavigate } from "react-router-dom";
import formularioIcon from "../../assets/formulario.png";
import "../../pages/dashboard/dashboardPage.css";

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/nueva-publicacion");
  };

  return (
    <div className="sidebar-container">
      <img
        src={formularioIcon}
        alt="Abrir formulario"
        className="form-button"
        onClick={handleClick}
        style={{ cursor: "pointer", width: "70px", height: "80px"}}
        title="Crear nueva publicación"
      />
    </div>
  );
};
