import { useEffect, useState } from 'react';
import { getPublications } from '../../services/api';
import PublicationCard from '../publication/PublicationCard';

export default function PublicationList() {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    getPublications()
      .then(res => setPublications(res.data.publications))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {publications.map(pub => (
        <PublicationCard key={pub._id} publication={pub} />
      ))}
    </div>
  );
}