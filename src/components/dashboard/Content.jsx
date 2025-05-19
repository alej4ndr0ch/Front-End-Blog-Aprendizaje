import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Publications } from '../../publication/Publications';
import { getPublications } from '../../services/api';

export const Content = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getPublications({ desde: 0, limite: 10 });
        setPublications(res.data.publications);
      } catch (error) {
        console.error("Error cargando publicaciones", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="content-container">
      <Routes>
        <Route path="publications" element={<Publications publications={publications} />} />
      </Routes>
    </div>
  );
};
