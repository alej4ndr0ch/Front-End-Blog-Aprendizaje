import { useEffect, useState } from 'react';
import { getPublications } from '../../services/api';
import PublicationCard from '../../components/publication/PublicationCard';
import  Eclipse  from '../../assets/Eclipse.mp4'

export const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [pagination, setPagination] = useState({ desde: 0, limite: 10 });

  useEffect(() => {
    fetchPublications();
  }, [pagination]);

  const fetchPublications = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getPublications({ desde: pagination.desde, limite: pagination.limite });
      setPublications(response.data.publications);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar las publicaciones.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setPagination(prev => ({ ...prev, desde: prev.desde + prev.limite }));
  };

  const handlePrevious = () => {
    setPagination(prev => ({
      ...prev,
      desde: Math.max(prev.desde - prev.limite, 0),
    }));
  };

  return (
    
    <div className="dashboard-container">
      <div className="video-background">
    <video autoPlay loop muted playsInline>
        <source src={Eclipse} type="video/mp4"/>
    </video>
  </div>
      <h1 className="text-3xl font-bold mb-6">Publicaciones</h1>

      {loading && <p>Cargando publicaciones...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && publications.length === 0 && (
        <p>No hay publicaciones disponibles.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publications.map(pub => (
          <PublicationCard key={pub._id} publication={pub} />
        ))}
      </div>

      <div className="content-button">
        <button
          onClick={handlePrevious}
          disabled={pagination.desde === 0}
          className="container-button-previous"
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          className="container-button-next"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
