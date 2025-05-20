import { useEffect, useState } from 'react';
import { getComments } from '../../services/api';
import { getCommentsByPublicationId } from '../../services/api';
import CommentForm from '../../components/Comment/CommentForm';

export default function PublicationCard({ publication }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsData = await getCommentsByPublicationId(publication._id);
      console.log("Comentarios obtenidos:", commentsData);
      setComments(Array.isArray(commentsData) ? commentsData : []);
    };

    fetchComments();
  }, [publication._id]);

  const fetchComments = async () => {
    try {
      const response = await getComments(publication._id);
      console.log("getComments:", response);
      if (Array.isArray(response?.data)) {
        setComments(response.data);
      } else {
        console.warn("getComments no retornó un array:", response.data);
        setComments([]);
      }
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
      setComments([]);
    }
  };

  return (
    <div className="publication-card">
      <h2>{publication.title}</h2>
      <p><strong>Curso:</strong> {publication.courses?.name || "Sin curso"}</p>
      <p className="publication-username">Por: {publication.user?.username || 'Anónimo'}</p>
      <p>{publication.content}</p>

      <div className=''>
      <CommentForm
        publicationId={publication._id}
        onCommentAdded={fetchComments}
      />
      </div>

      <div className="mt-4">
        <h3 className="font-bold mb-2">Comentarios</h3>
        {comments.length === 0 ? (
          <p className="text-gray-500">Aún no hay comentarios.</p>
        ) : (
          <ul className="comment-card">
            {comments.map((comment) => (
              <li key={comment._id} className="border-b pb-2">
                <div><strong>Usuario:</strong> {comment.user?.username || 'Anónimo'}</div>
                <div><strong>Comentario:</strong> {comment.text}</div>
                <div><strong>Fecha:</strong> {comment.DateAndTime}</div>
                <div><strong>Creado:</strong> {new Date(comment.createdAt).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}