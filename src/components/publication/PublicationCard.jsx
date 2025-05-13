import { Link } from 'react-router-dom';

export default function PublicationCard({ publication }) {
  return (
    <div className="border rounded-xl shadow p-4">
      <h2 className="text-lg font-bold">{publication.title}</h2>
      <p className="text-sm text-gray-500">Por: {publication.username}</p>
      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{publication.content}</p>
      <Link to={`/publications/${publication._id}`} className="text-blue-500 mt-2 block">
        Ver más
      </Link>
    </div>
  );
}