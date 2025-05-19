import { useEffect, useState } from "react";
import { getPublications } from "../../services/api";
import { Navbar } from "../../components/navbars/Navbar";
import { Sidebar } from "../../components/navbars/Sidebar";
import { Publications } from "../../components/publication/Publications";
import Eclipse from "../../assets/Eclipse.mp4";

import "./dashboardPage.css";

export const DashboardPage = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({ desde: 0, limite: 10 });

  useEffect(() => {
    fetchPublications();
  }, [pagination]);

  const fetchPublications = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getPublications({
        desde: pagination.desde,
        limite: pagination.limite,
      });
      setPublications(response.data.publications);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las publicaciones.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setPagination((prev) => ({ ...prev, desde: prev.desde + prev.limite }));
  };

  const handlePrevious = () => {
    setPagination((prev) => ({
      ...prev,
      desde: Math.max(prev.desde - prev.limite, 0),
    }));
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="main-content">
        <Sidebar />

        <div className="page-container">
          <div className="publication-card">
            <div className="video-background">
              <video autoPlay loop muted playsInline>
                <source src={Eclipse} type="video/mp4" />
              </video>
            </div>
            <h1 className="text-3xl font-bold mb-6">Publicaciones</h1>

            {loading && <p>Cargando publicaciones...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && publications.length === 0 && (
              <p>No hay publicaciones disponibles.</p>
            )}

            <div className="publication-card-2">
              {publications.map((pub) => (
                <PublicationCard key={pub._id} publication={pub} />
              ))}
            </div>

            <div className="pagination-container">
              <button
                onClick={handlePrevious}
                disabled={pagination.desde === 0}
                className="pagination-button"
              >
                Anterior
              </button>
              <button onClick={handleNext} className="pagination-button">
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
