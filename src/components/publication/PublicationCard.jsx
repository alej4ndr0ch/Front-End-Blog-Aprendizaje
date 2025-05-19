import { Link } from 'react-router-dom';
import { validationAvatarUrl } from '../../shared/validators/validateAvatarUrl';
import '../../pages/dashboard/dashboardPage.css'

export default function PublicationCard({ publication }) {
  return (
    <div className="publication-card">
      {publication.image && validationAvatarUrl(publication.image) && (
        <img
          src={publication.image}
          alt={publication.title}
        />
      )}
      <h2 className="publication-title">{publication.title}</h2>
      <p className="publication-username">Por: {publication.user?.username || 'Anónimo'}</p>
      <p className="publication-content">{publication.content}</p>
      <form className="comment-form">
        <textarea placeholder="Escribe tu comentario aquí..." />
        <button type="submit" className="comment-button">Comentar</button>
      </form>

    </div>
  );
}

