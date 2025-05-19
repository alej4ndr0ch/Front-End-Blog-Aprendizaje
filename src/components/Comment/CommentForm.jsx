import { useState } from 'react';
import { addComment } from '../../services/api';

export default function CommentForm({ publicationId, onCommentAdded }) {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const result = await addComment(publicationId, { text });

            if (result.success) {
                setMessage('Comentario agregado con éxito');
                setText('');
                if (onCommentAdded) {
                    onCommentAdded(); 
                }
            } else {
                setMessage(result.message || 'Error al agregar comentario');
            }
        } catch (error) {
            setMessage('Error inesperado al enviar el comentario');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2 p-4 bg-white rounded shadow">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribe tu comentario aquí..."
                className="w-full p-2 border rounded"
                rows={3}
                required
            />
            <button type="submit" disabled={loading} className="btn bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                {loading ? 'Enviando...' : 'Comentar'}
            </button>
            {message && <p className="text-sm mt-2 text-gray-600">{message}</p>}
        </form>
    );
}
