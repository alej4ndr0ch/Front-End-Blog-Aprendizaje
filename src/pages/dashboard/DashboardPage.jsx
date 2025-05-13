import { useEffect, useState } from 'react';
import { getPublications } from '../services/publicationService';
import PublicationCard from '../components/PublicationCard';

export default function Publications() {
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
    <div className="p-6">
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

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handlePrevious}
          disabled={pagination.desde === 0}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
