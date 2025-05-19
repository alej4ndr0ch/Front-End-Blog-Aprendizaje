import { Link } from 'react-router-dom';
import { validationAvatarUrl } from '../../shared/validators/validateAvatarUrl';
import CommentForm from '../Comment/CommentForm';
import '../../pages/dashboard'

export default function PublicationCard({ publication }) {
  return (
    <div className="publication-card p-4 bg-white rounded shadow-md">
      {publication.image && validationAvatarUrl(publication.image) && (
        <img
          src={publication.image}
          alt={publication.title}
          className="w-full h-48 object-cover rounded-t-xl mb-4"
        />
      )}
      <h2 className="text-lg font-bold">{publication.title}</h2>
      <p className="text-sm text-gray-500">Por: {publication.user?.username || 'Anónimo'}</p>
      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{publication.content}</p>
      <div className="mt-4">
        <CommentForm publicationId={publication._id} />
      </div>
    </div>
  );
}

